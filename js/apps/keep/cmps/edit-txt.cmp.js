import editActions from './edit-actions.cmp.js';

export default {
    props: ['note'],
    emits: ['close'],
    template: `
    <section class="edit-txt">

    <div class="input-sec">
        <input type="text" placeholder="title" v-model="title">

        <textarea type="text" placeholder="note" v-model="txt" 
        rows="4" cols=""></textarea>
    </div>

    <edit-actions @close="close" @color="sendColor"/>

    </section>

    `,
    components: {
        editActions
    },
    data() {
        return {
            title: this.note.info.title,
            txt: this.note.info.txt,
            doIt: this.doIt
        }
    },
    methods: {
        close() {
            this.$emit('close', { title: this.title, txt: this.txt })
        },
        sendColor(color){
            this.$emit('color', color)
        }
    }
}