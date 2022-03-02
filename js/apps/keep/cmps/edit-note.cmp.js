
export default {
    props: ['note'],
    emits: ['close', 'color'],
    template: `
    <section :class="[note.style, 'edit-note']">
            <h1>Edit</h1>
            <h2>{{note.info.txt}}</h2>
            <input type="text" placeholder="title">
            <input type="text" placeholder="note">

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
            title: null,
            txt: null,
            bgColor: null,
            colors: ['grey', 'brown', 'pink', 'purple', 'dark-blue', 'blue', 'turquoise',
                'green', 'yellow', 'orange', 'red', 'none'],
            colorPicker: false
        }
    },
    methods: {
        close() {
            this.$emit('close')
        },
        onSetColor(color){
            console.log('color');
            this.note.style = color;
            this.$emit('color', {...this.note})
        }
    },
    computed: {

    }
}