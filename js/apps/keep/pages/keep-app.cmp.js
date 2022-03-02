import { noteService } from '../services/noteService.service.js';
import noteTxt from '../cmps/note-txt.cmp.js';
import noteImg from '../cmps/note-img.cmp.js';
import noteVideo from '../cmps/note-video.cmp.js';
import noteTodos from '../cmps/note-todos.cmp.js';


export default {
    template: `

    <section class="grid main-layout" v-if="notes">
        
        <div class="note" v-for="cmp in notes.cmps">
            <component :is="cmp.type" :cmp="cmp" @delete="onDelete"></component>
        </div>
        
    </section>
        `,
    components: {
        noteTxt,
        noteImg,
        noteVideo,
        noteTodos
    },
    data() {
        return {
            notes: null,
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
        }
    }

}