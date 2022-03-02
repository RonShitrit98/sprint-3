import { noteService } from "../services/noteService.service.js"



export default {
    template: `

    <section class="notes main-layout" v-if="notes">
        <h1>Notes!!!!!!!!!</h1>
        
        <div class="note" v-for="cmp in notes.cmps">
            <component :is="cmp.type" :info="cmp.info"></component>
        </div>
        
    </section>
        `,
    data() {
        return {
            notes: null,
        }
    },
    created() {
        noteService.getById()
        .then(notes => {
            this.notes = notes
            console.log(this.notes);
        })
    },

}