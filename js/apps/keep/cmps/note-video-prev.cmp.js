export default {
    props: ['cmp'],
    emits:['delete'],
    template: `
    <section class="note-video" @click="onEdit(cmp.id)">
        <img :src="cmp.info.url" alt="">
        <h1>{{cmp.info.title}}</h1>
        <h2>{{cmp.info.txt}}</h2>
        <button @click="onDeleteNote(cmp.id)">X</button>
    </section>
    `,
    methods:{
        onDeleteNote(id) {
            this.$emit('delete', id)
        },
        onEdit(id){
            this.$emit('edit', id)
        }
    }
}