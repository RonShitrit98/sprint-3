export default {
    props: ['cmp'],
    emits: ['delete', 'edit', 'pin', 'duplicate', 'todoDone'],
    template: `
    <section :class="['note-todos', noteSpan]" @click="onEdit(cmp.id)">
    <label @click.stop="pinTheNote(cmp)">pin</label>| |
        <label style="align-self: end;" @click.stop="duplicateNote(cmp)">duplicate</label>
        <h1>{{cmp.info.title}}</h1>

        <ul>
            <li v-for="todo in cmp.info.todos" @click.stop >
                <label for="todo.id" :class="{done: todo.doneAt}">{{todo.txt}}</label>
                <input type="checkbox" id="todo.id"  @click.stop @change="isDone(todo.id)"
                v-if="todo.doneAt" checked>
                <input type="checkbox" id="todo.id"  @click.stop @change="isDone(todo.id)"
                v-if="!todo.doneAt">
            </li>
        </ul>

        <button @click.stop="onDeleteNote(cmp.id)">X</button>
    </section>
    `,
    data() {
        return {}
    },
    methods: {
        onDeleteNote(id) {
            this.$emit('delete', id)
        },
        onEdit(id) {
            this.$emit('edit', id)
        },
        pinTheNote(note) {
            this.$emit('pin', { ...note })
        },
        duplicateNote(note) {
            this.$emit('duplicate', { ...note })
        },
        isDone(todoId) {
            this.$emit('todoDone', todoId)
        },
    },
    computed: {
        noteSpan() {
            if (this.cmp.info.todos.length <= 2) return 'span2';
            else if (this.cmp.info.todos.length > 2 &&
                this.cmp.info.todos.length <= 5) return 'span3';
            else return 'span4'
            // else if (this.cmp.info.todos.length > 5 &&
            //     this.cmp.info.todos.length <= 5) return 'span4';
        }
    }
}