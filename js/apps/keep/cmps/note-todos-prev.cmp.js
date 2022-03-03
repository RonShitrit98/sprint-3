export default {
    props:['cmp'],
    emits:['delete', 'edit', 'pin', 'duplicate'],
    template:`
    <section class="note-todos" @click="onEdit(cmp.id)">
    <label @click.stop="pinTheNote(cmp)">pin</label>| |
        <label @click.stop="duplicateNote(cmp)">duplicate</label>
        <h1>{{cmp.info.title}}</h1>

        <ul>
            <li v-for="todo in cmp.info.todos">
                {{todo.txt}}
                <input type="checkbox" name="" id="">
            </li>
        </ul>

        <button @click.stop="onDeleteNote(cmp.id)">X</button>
    </section>
    `,
    data(){
        return {
            
        }
    },
    methods:{
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
    }
}