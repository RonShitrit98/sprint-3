export default {
    props: ['note'],
    emits: ['close'],
    template: `
    <section class="edit-img">

        <iframe :src="note.info.url" frameborder="0" style="width: 100%"></iframe>

        <input type="text" placeholder="title" v-model="title">

        <input type="text" placeholder="note" v-model="txt">

        <button @click="close">Close</button>
        
    </section>
    `,
    data() {
        return {
            title: this.note.info.title,
            txt: this.note.info.txt,
        }
    },
    methods: {
        close() {
            this.$emit('close', { title: this.title, txt: this.txt })
        }
    }
}