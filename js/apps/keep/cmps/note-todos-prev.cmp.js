export default {
    props:['cmp'],
    emits:['delete', 'edit'],
    template:`
    <section class="note-todos" @click="onEdit(cmp.id)">
        <h1>{{cmp.info.title}}</h1>

        <ul>
            <li v-for="todo in cmp.info.todos">
                {{todo.txt}}
                <input type="checkbox" name="" id="">
            </li>
        </ul>

        <button @click="onDeleteNote(cmp.id)">X</button>
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
        }
    }
}