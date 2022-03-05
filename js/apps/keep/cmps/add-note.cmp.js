import { noteService } from '../services/noteService.service.js';
import { eventBus } from '../../../services/eventBus.service.js';

export default {
    props: ['notes'],
    emits: ['newNote', 'adding'],
    template: `
    <section class="add-new-note">
        <div class="add-method keep-main-layout" v-if="!chosenType">
            <input  type="text" placeholder="new note" @focus="setType('txt')">
            <button @click="setType('img')">
                <ion-icon name="image-outline"></ion-icon>
            </button>
            <button @click="setType('video')">
                <ion-icon name="videocam-outline"></ion-icon>
            </button>
            <button @click="setType('todos')">
                <ion-icon name="list-outline"></ion-icon>
            </button>
        </div>

        <section :class="['type-txt', 'clean-input', chosenColor]" v-if="chosenType === 'txt'">
            <input type="text" placeholder="title" v-model="title">
            <textarea type="text" placeholder="txt" v-model="txt"></textarea>
        </section>

        <section :class="['type-img', 'clean-input', chosenColor]" v-if="chosenType === 'img'">
            <input type="text" placeholder="Image URL" v-model="url">
            <input type="text" placeholder="title" v-model="title">
            <textarea type="text" placeholder="txt" v-model="txt"></textarea>
        </section>

        <section :class="['type-video', 'clean-input', chosenColor]" v-if="chosenType === 'video'">
            <input type="text" placeholder="Video URL" v-model="url">
            <input type="text" placeholder="title" v-model="title">
            <textarea type="text" placeholder="txt" v-model="txt"></textarea>
        </section>
        
        
        <section :class="['type-todos', 'clean-input', chosenColor]" v-if="chosenType === 'todos'" >
            <div class="todos-input">
                <input type="text" placeholder="title" v-model="title">
                <input type="text" placeholder="Todo" v-model="txt">
                <button @click="newTodo">Add Todo</button>
            </div>

            <div class="new-todos-container">
                <div class="add-todo" v-if="todos.length !== 0" v-for="todo in todos">
                    <button @click="onDeleteTodo(todo.id)">x</button>
                    <input type="text" placeholder="note" v-model="todo.txt">
                    <input type="checkbox" @change="isDone(todo.id)" >
                </div>
            </div>
        </section>


        <div class="new-note-actions">
            <button @click.stop="colorPicker = !colorPicker; setPos($event)" v-if="chosenType">
                <ion-icon name="color-palette-outline"></ion-icon>
            </button>
            <div class="colors-container" v-if="colorPicker" :style="{position: 'absolute', top: yPos*1.35 + 'px', left: xPos/1.6 + 'px'}">
                <div class="color" v-for="color in colors" :class="color" 
                @click="onSetColor(color)"></div>
            </div>
    
            <button v-if="chosenType" @click="addNewNote">Add Note</button>
        </div>

    </section>
    `,
    data() {
        return {
            chosenType: null,
            chosenColor: '',
            colorPicker: false,
            colors: ['grey', 'brown', 'pink', 'purple', 'dark-blue', 'blue', 'turquoise',
                'green', 'yellow', 'orange', 'red', 'none'],
            txt: null,
            title: null,
            url: null,
            todos: [],
            xPos: null,
            yPos: null,

        }
    },
    methods: {
        setType(type) {
            this.chosenType = type;
            this.$emit('adding')
        },
        addNewNote() {
            const note = noteService.getEmptyNote(this.chosenType, this.chosenColor);
            note.info.title = this.title;
            note.info.txt = this.txt;
            if (this.chosenType === 'img' || this.chosenType === 'video') note.info.url = this.url;

            if (this.chosenType === 'todos') {
                console.log(this.todos);
                note.info.todos = this.todos;
            }
            noteService.save(note)
            this.$emit('newNote', { ...note })
            eventBus.emit('show-msg', { txt: 'New note added', type: 'success' })

            this.title = null;
            this.txt = null;
            this.url = null;
            this.todos = [];
            this.chosenColor = '';
            this.chosenType = null;
            this.colorPicker = false;
            this.$emit('adding')
        },
        onSetColor(color) {
            console.log('color');
            this.chosenColor = color;
        },
        newTodo() {
            const todo = noteService.getEmptyTodo();
            todo.txt = this.txt;
            this.todos.unshift(todo);
            console.log(this.todos);
            this.txt = '';
        },
        onDeleteTodo(id) {
            const idx = this.todos.findIndex(todo => todo.id === id);
            this.todos.splice(idx, 1)
        },
        isDone(todoId) {
            this.todos = this.todos.map(todo => {
                if (todo.id === todoId){
                    if (!todo.doneAt) {
                        todo.doneAt = Date.now();
                    }
                    else todo.doneAt = null;
                }
                return todo
            });
            console.log(this.todos);
        },
        setPos(ev) {
            console.log('llll');
            this.xPos = ev.clientX
            this.yPos = ev.clientY
        },
    }
}