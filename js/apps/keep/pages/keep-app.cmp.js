import { utilService } from '../../../services/util.service.js';
import { noteService } from '../services/noteService.service.js';
import noteTxt from '../cmps/note-txt-prev.cmp.js';
import noteImg from '../cmps/note-img-prev.cmp.js';
import noteVideo from '../cmps/note-video-prev.cmp.js';
import noteTodos from '../cmps/note-todos-prev.cmp.js';
import editNote from '../cmps/edit-note.cmp.js';
import addNote from '../cmps/add-note.cmp.js';
import filterNotes from '../cmps/filter-notes.cmp.js';


export default {
    template: `
    <section class="keep-app keep-main-layout">

        <div class="search-container">
            <add-note :notes="notes" @newNote="onAddNote" @adding="isFilter = !isFilter"/>
        
            <filter-notes v-if="isFilter" @filter="setFilter" />
        </div>

        <section class="pinned-notes" v-if="pinnedNotes.length > 0">
                <div v-for="note in pinnedNotes">
                    <component :class="['note', note.type]" :is="note.type" :cmp="note" :class="note.style" 
                    @delete="onDelete" @edit="onEdit" @pin="pinTheNote" @todoDone="markAsDone"></component>
                </div>
        </section>

    <section class="grid-container" v-if="notes">
        <div class="grid">
            <component class="note" v-for="cmp in notesForDisplay" :is="cmp.type" :cmp="cmp" 
            :class="cmp.style" @delete="onDelete" @edit="onEdit" @pin="pinTheNote"
            @duplicate="duplicateNote" @todoDone="markAsDone" @color="onSetColor"></component>
        </div>
    </section>

    <edit-note v-if="isEdit" :note="selectedNote" @close="closeEdit" @color="onSetColor"/>
    
    </section>

        `,
    components: {
        noteTxt,
        noteImg,
        noteVideo,
        noteTodos,
        editNote,
        addNote,
        filterNotes,
    },
    data() {
        return {
            notes: null,
            isEdit: false,
            selectedNote: null,
            isFilter: true,
            filterBy: null,
            pinnedNotes: [],
        }
    },
    created() {
        noteService.query('notes')
            .then(notes => {
                this.notes = notes.map(note => {
                    if (note.isPinned) {
                        this.pinnedNotes.push(note)
                    }
                    else return note
                })
            })
    },
    methods: {
        onDelete(id) {
            const note = this.notes.find(note => note.id === id);
            if (!note) {
                const idx = this.pinnedNotes.findIndex(note => note.id === id)
                this.pinnedNotes.splice(idx,1)
            }
            noteService.deleteNote(id)
                .then(res => this.notes = res)
        },
        onEdit(id) {
            this.selectedNote = this.notes.find(note => note.id === id);
            this.isEdit = true;
        },
        closeEdit(note) {
            noteService.updateNote(note)
                .then(note => {
                    const idx = this.notes.findIndex(currNote => currNote.id === note.id)
                    this.notes[idx] = note
                })
            this.isEdit = false;
            this.selectedNote = null;
        },
        onSetColor(note) {
            noteService.updateNote(note)
                .then(note => {
                    const idx = this.notes.findIndex(currNote => currNote.id === note.id)
                    this.notes[idx] = note
                })
        },
        onAddNote(note) {
            this.notes.unshift(note)
        },
        setFilter(filterBy) {
            console.log(filterBy);
            this.filterBy = filterBy
        },
        pinTheNote(note) {
            if (note.isPinned) {
                note.isPinned = false;
                noteService.updateNote(note)
                    .then(note => {
                        const idx = this.pinnedNotes.findIndex(currNote => currNote.id === note.id)
                        this.pinnedNotes.splice(idx, 1)
                        this.notes.unshift(note)
                    })
            }
            else {
                note.isPinned = true;
                noteService.updateNote(note)
                    .then(note => {
                        const idx = this.notes.findIndex(currNote => currNote.id === note.id)
                        this.notes.splice(idx, 1)
                        this.pinnedNotes.unshift(note)
                    })
            }
        },
        duplicateNote(note) {
            note.id = utilService.makeId();
            console.log(note);
            noteService.duplicate(note)
                .then(note => {
                    this.notes.unshift(note)
                })
        },
        markAsDone(todoId) {
            const note = this.notes.find(note => {
                if (note.type === 'note-todos') {
                    note.info.todos.find(todo => {
                        if (todo.id === todoId) {
                            if (!todo.doneAt) {
                                todo.doneAt = Date.now();
                            }
                            else todo.doneAt = null;
                        }
                    })
                    return note
                }
            })
            noteService.updateNote(note)
                .then(note => {
                    const idx = this.notes.findIndex(currNote => currNote.id === note.id)
                    this.notes[idx] = note
                })
        }
    },
    computed: {
        notesForDisplay() {
            if (!this.filterBy) return this.notes;
            const regex = new RegExp(this.filterBy, 'i')
            return this.notes.filter(note => {
                if (note.type === this.filterBy || regex.test(note.info.title)) return note
            })
        }
    }

}