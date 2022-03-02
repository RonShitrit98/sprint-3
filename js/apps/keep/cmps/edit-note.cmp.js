
export default {
    props: ['note'],
    emits: ['close', 'color'],
    template: `
    <section :class="[note.style, 'edit-note']">

        <input type="text" placeholder="title" v-model="title">

            <input type="text" placeholder="note" v-model="txt">

        <button @click="close">Close</button>
        
        <button @click="colorPicker = !colorPicker">color picker</button>
        
        <div class="colors-container" v-if="colorPicker">
            <div class="color-picker" v-for="color in colors" :class="color" 
            @click="onSetColor(color)"></div>
        </div>
        
    </section>

    `,
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
        close() {
            this.note.info.title = this.title
            this.note.info.txt = this.txt

            this.$emit('close', { ...this.note })
        },
        onSetColor(color) {
            console.log('color');
            this.note.style = color;
            this.$emit('color', { ...this.note })
        }
    },
    computed: {
    }
}