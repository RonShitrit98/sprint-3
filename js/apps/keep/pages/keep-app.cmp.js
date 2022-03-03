import { noteService } from '../services/noteService.service.js';
import noteTxt from '../cmps/note-txt-prev.cmp.js';
import noteImg from '../cmps/note-img-prev.cmp.js';
import noteVideo from '../cmps/note-video-prev.cmp.js';
import noteTodos from '../cmps/note-todos-prev.cmp.js';
import editNote from '../cmps/edit-note.cmp.js';
import addNote from '../cmps/add-note.cmp.js';


export default {
    template: `

    <add-note :notes="notes" @newNote="onAddNote" />

    <section class="grid " v-if="notes">
            <component class="note" v-for="cmp in notes" :is="cmp.type" :cmp="cmp" :class="cmp.style" @delete="onDelete" 
            @edit="onEdit" ></component>
        
    </section>

    <edit-note v-if="isEdit" :note="selectedNote" @close="closeEdit" @color="onSetColor"/>

    
        `,
    components: {
        noteTxt,
        noteImg,
        noteVideo,
        noteTodos,
        editNote,
        addNote
    },
    data() {
        return {
            notes: null,
            isEdit: false,
            selectedNote: null
        }
    },
    created() {
        noteService.query()
            .then(notes => {
                this.notes = notes
                console.log(this.notes);
            })
    },
    methods: {
        onDelete(id) {
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
        }
    }

}