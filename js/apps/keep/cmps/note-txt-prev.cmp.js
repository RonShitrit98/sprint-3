export default {
    props: ['cmp'],
    emits:['delete', 'edit', 'pin', 'duplicate'],
    template: `
    <section :class="['note-txt', noteSpan]" @click.stop="onEdit(cmp.id)">

        <label @click.stop="pinTheNote(cmp)">pin</label> | |
        <label style="align-self: end;" @click.stop="duplicateNote(cmp)">duplicate</label>
        
        <pre>{{cmp.info.txt}}</pre>

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
        },
        pinTheNote(note){
            this.$emit('pin', {...note})
        },
        duplicateNote(note){
            this.$emit('duplicate', {...note})
        }
    },
    computed:{
        noteSpan(){

        }
    }
}