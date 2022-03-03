import { utilService } from '../../../services/util.service.js'

export default {
    props: ['note'],
    emits: ['close'],
    template: `
    <section class="edit-txt">

        <input type="text" placeholder="title" v-model="title">

        <div class="add-todo" v-for="todo in note.info.todos">
            <button @click="onDeleteTodo(todo.id)">x</button>
            <input type="text" placeholder="note" v-model="todo.txt">
            <input type="checkbox" name="" id="">
        </div>

        <input type="text" v-model="txt">
        <button @click="addTodo">Add todo</button>

        <button @click="close">Close</button>
        
    </section>

    `,
    data() {
        return {
            title: this.note.info.title,
            txt: null,
        }
    },
    methods: {
        close() {
            this.$emit('close', { title: this.title, txt: this.txt })
        },
        onDeleteTodo(id) {
            const idx = this.note.info.todos.findIndex(todo => todo.id === id);
            this.note.info.todos.splice(idx, 1)
        },
        addTodo() {
            if (!this.txt || this.txt === ' ') return
            const newId = utilService.makeId()
            this.note.info.todos.push({ txt: this.txt, doneAt: null, id: newId })
            this.txt = ''
        }
    },
}