export default {
    props: ['colors', 'note'],
    template: `
     <div class="edit-actions">
            <button @click="onClose">
                <ion-icon name="close-circle-outline"></ion-icon>
            </button>

            <label @click.stop="colorPicker = !colorPicker; setPos()" >         
                <ion-icon name="color-palette-outline"></ion-icon>
            </label>

            <div class="colors-container" v-if="colorPicker" :style="{position: 'absolute', top: yPos/2  + 'px', left: xPos - 350 + 'px'}">
                <div class="color" v-for="color in colors" :class="color" 
                @click="onSetColor(color)"></div>
            </div>
        </div>
    `,
    data() {
        return {
            colors: ['grey', 'brown', 'pink', 'purple', 'dark-blue', 'blue', 'turquoise',
                'green', 'yellow', 'orange', 'red', 'none'],
            colorPicker: false,
            colorPicker: false,
            xPos: null,
            yPos: null,
        }
    },
    methods: {
        onClose() {
            this.$emit('close')
        },
        setPos(ev) {
            this.xPos = ev.clientX
            this.yPos = ev.clientY
        },
        onSetColor(color){
            this.$emit('color', color)
        }
    }
}