import editTxt from './edit-txt.cmp.js';
import editImg from './edit-img.cmp.js';
import editVid from './edit-vid.cmp.js';
import editTodos from './edit-todos.cmp.js';

export default {
    props: ['note'],
    emits: ['close', 'color'],
    template: `
    <section :class="[note.style, 'edit-note']">
        <edit-txt v-if="isTypeTxt" @close="close" :note="note"/>
        <edit-img v-if="isTypeImg" @close="close" :note="note"/>
        <edit-vid v-if="isTypeVid" @close="close" :note="note"/>
        <edit-todos v-if="isTypeTodo" @close="close" :note="note"/>

        <button @click="colorPicker = !colorPicker">color picker</button>
        <div class="colors-container" v-if="colorPicker">
            <div class="color-picker" v-for="color in colors" :class="color" 
            @click="onSetColor(color)"></div>
        </div>
    </section>

    `,
    components: {
        editTxt,
        editImg,
        editVid,
        editTodos
    },
    data() {
        return {
            title: this.note.info.title,
            txt: this.note.info.txt,
            bgColor: null,
            colors: ['grey', 'brown', 'pink', 'purple', 'dark-blue', 'blue', 'turquoise',
                'green', 'yellow', 'orange', 'red', 'none'],
            colorPicker: false
        }
    },
    methods: {
        close({ title, txt, note }) {
            if (note){
                this.$emit('close', { ...note })
            }
            else{
                if (title) this.note.info.title = title;
                if (txt) this.note.info.txt = txt;
                this.$emit('close', { ...this.note });
            }
        },
        onSetColor(color) {
            this.note.style = color;
            this.$emit('color', { ...this.note });
        }
    },
    computed: {
        isTypeTxt() {
            return (this.note.type === 'note-txt')
        },
        isTypeImg() {
            return (this.note.type === 'note-img')
        },
        isTypeVid() {
            return (this.note.type === 'note-video')
        },
        isTypeTodo() {
            return (this.note.type === 'note-todos')
        },
    }
}