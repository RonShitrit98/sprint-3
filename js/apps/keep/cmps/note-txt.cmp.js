export default {
    props: ['cmp'],
    emits:['delete', 'edit'],
    template: `
    <section class="content-container" @click="onEdit(cmp.id)">
        
        <h1>{{cmp.info.txt}}</h1>

        <button @click.stop="onDeleteNote(cmp.id)">X</button>
    </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        onDeleteNote(id) {
            this.$emit('delete', id)
        },
        onEdit(id){
            this.$emit('edit', id)
        }
    }
}