import { noteService } from '../services/noteService.service.js';
import noteTxt from '../cmps/note-txt.cmp.js';
import noteImg from '../cmps/note-img.cmp.js';
import noteVideo from '../cmps/note-video.cmp.js';
import noteTodos from '../cmps/note-todos.cmp.js';
import editNote from '../cmps/edit-note.cmp.js';


export default {
    template: `

    <input type="text">

    <section class="grid main-layout" v-if="notes">
        <div class="note" v-for="cmp in notes.cmps">
            <component :is="cmp.type" :cmp="cmp" @delete="onDelete" 
            @edit="onEdit" :class="cmp.style"></component>
        </div>
        
    </section>

    <edit-note v-if="isEdit" :note="selectedNote" @close="closeEdit"/>

    
        `,
    components: {
        noteTxt,
        noteImg,
        noteVideo,
        noteTodos,
        editNote
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
            this.selectedNote = this.notes.cmps.find(note => note.id === id);
            this.isEdit = true;
        },
        closeEdit() {
            this.isEdit = false;
            this.selectedNote = null;
        }
    }

}