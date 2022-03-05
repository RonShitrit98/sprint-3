import editActions from './edit-actions.cmp.js';

export default {
    props: ['note'],
    emits: ['close'],
    template: `
    <section class="edit-img">

        <img :src="note.info.url" alt="" style="width: 100%">

        <div class="input-sec">
            <input type="text" placeholder="title" v-model="title">
    
            <input type="text" placeholder="note" v-model="txt">
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