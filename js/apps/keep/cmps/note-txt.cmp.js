export default {
    props: ['cmp'],
    emits:['delete'],
    template: `
    <section class="content-container">
        
        <h1>{{cmp.info.txt}}</h1>

        <button @click="onDeleteNote(cmp.id)">X</button>
    </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        onDeleteNote(id) {
            this.$emit('delete', id)
        }
    }
}