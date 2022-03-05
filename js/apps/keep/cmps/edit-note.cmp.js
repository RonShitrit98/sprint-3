import { eventBus } from '../../../services/eventBus.service.js';
import editTxt from './edit-txt.cmp.js';
import editImg from './edit-img.cmp.js';
import editVid from './edit-vid.cmp.js';
import editTodos from './edit-todos.cmp.js';

export default {
    props: ['note'],
    emits: ['close', 'color'],
    template: `
    <section :class="[note.style, 'edit-note']">
        <edit-txt v-if="isTypeTxt" @close="close" :note="note" @color="onSetColor"/>
        <edit-img v-if="isTypeImg" @close="close" :note="note" @color="onSetColor"/>
        <edit-vid v-if="isTypeVid" @close="close" :note="note" @color="onSetColor"/>
        <edit-todos v-if="isTypeTodo" @close="close" :note="note" @color="onSetColor"/>

        <!-- <div class="edit-actions">
            <button @click="close">
                <ion-icon name="close-circle-outline"></ion-icon>
            </button>

            <label @click.stop="colorPicker = !colorPicker" @click.stop="setPos">         
                <ion-icon name="color-palette-outline"></ion-icon>
            </label>

            <div class="colors-container" v-if="colorPicker" :style="{position: 'absolute', top: yPos/2  + 'px', left: xPos - 350 + 'px'}">
                <div class="color" v-for="color in colors" :class="color" 
                @click="onSetColor(color)"></div>
            </div>
        </div> -->
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
            // colors: ['grey', 'brown', 'pink', 'purple', 'dark-blue', 'blue', 'turquoise',
            //     'green', 'yellow', 'orange', 'red', 'none'],
            // colorPicker: false,
            xPos: null,
            yPos: null,
            doItNow: null
        }
    },
    methods: {
        close({ title, txt, note }) {
            if (note) {
                this.$emit('close', { ...note })
            }
            else {
                if (title) this.note.info.title = title;
                if (txt) this.note.info.txt = txt;
                this.$emit('close', { ...this.note });
            }
            this.$emit('screen')
            eventBus.emit('show-msg', { txt: 'Note edited', type: 'success' })
        },
        onSetColor(color) {
            this.note.style = color;
            this.$emit('color', { ...this.note });
        },
        setPos(ev) {
            this.xPos = ev.clientX
            this.yPos = ev.clientY
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