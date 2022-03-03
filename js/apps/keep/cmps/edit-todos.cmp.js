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
            <input type="checkbox" @change="isDone(todo.id)" v-if="todo.doneAt" checked>
            <input type="checkbox" @change="isDone(todo.id)" v-if="!todo.doneAt">
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
            todos: []
        }
    },
    methods: {
        close() {
            if (this.title) this.note.info.title = this.title;
            if (this.txt) this.note.info.txt = this.txt;
            if (this.todos && this.todos.length > 0) this.note.info.todos = this.todos;
            this.$emit('close', { ...this.note })
            
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
        },
        isDone(todoId) {
            this.todos = this.note.info.todos.map(todo => {
                if (todo.id === todoId) {
                    if (!todo.doneAt) {
                        todo.doneAt = Date.now();
                    }
                    else todo.doneAt = null;
                }
                return todo
            })
        },
    },
}