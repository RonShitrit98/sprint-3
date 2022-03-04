export default {
    props:['cmp'],
    emits:['delete', 'edit', 'pin', 'duplicate'],
    template:`
    <section class="note-img" >
        <!-- <label class="pin" @click.stop="pinTheNote(cmp)"><ion-icon name="bookmark-outline"></ion-icon></label> -->
        <div class="trying">
            <label class="pin" @click.stop="pinTheNote(cmp)">
                <img v-if="!cmp.isPinned" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAaFJREFUSA1jZMAD/v//zwuU1gRiYRzK3gLFrzMyMn7GIc/AiEsCaLgRUK4MiEGW4AMgw7uAlpzDpgirBVCXz75z587nhMQUvqfPnvFg0ywtJfVl3txZn9TU1ECOSMXmEyZsGoFioGDhxWc4SB/I4qTkND6QWiAG6cEALBgiEAFwmMNcfv/uLazKFJXVwJZAJbHGEy4fYDWQHMFRCwiG2oAFETdBp2EqwKoHwwfATCYI1Bty8eLFJyAzWFlY/mGaBRGByUHVhkD1oijHsAAom/3r1y+WlNQMcLpubm54hKIDiQOTA6kF6QHpRZIGM1EsALrAFChq2djY9PbN27ecRgZ6b8NCQ+XQNcH4IDmQGpBakB6QXqgZMCWohR1Q0hMokwPKoeQAaI6fAiyTtsP0o/gAJkhNGmtZhK/sAVmOSx6bw9AtuApUNAWLQm2gmCOa+H4gH6QeHVxBFkCxABh2oBSDkWqAcQPSg27BVeSwRjYUmU3zOKC5BShBhOw1NPYHEL+zve0BVFwBSIPFoHzKKWA8hAPxVigOp9xELCZALSHJcADfepPyJOCCLQAAAABJRU5ErkJggg==">
                <img v-if="cmp.isPinned" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAY9JREFUSA1jZMAD/v//zwuU1gRiYRzK3gLFrzMyMn7GIc/AiEsCaLgRUK4MiEGW4AMgw7uAlpzDpgirBVCXz75z587nhMQUvqfPnvFg0ywtJfVl3txZn9TU1ECOSMXmEyZsGoFioGDhxWc4SB/I4qTkND6QWiAG6cEAuCwAhzkulyObgqQGazzhsgDZDIrYoxYQDL4BCyJugk7DVIBVD4YPgJlMEKg35OLFi08wzcAuAlUbAtWLoggjJwMV1fz69cvA2sae4c3bt5woqnFwRISFvx89cpCBjY3tAjA3tyArQ/EB0HBToKRlY2PTW2INBxkGUgvSA9ILNQMkDAYoPgBKegJFcxSV1aDSpFH3794CaZgC9MV2mE4UH8AEqUmzYDMM6hIMKZjPcMljaAAKoFtwFSg2BYtCbaCYI5r4fiAfpB4dXEEWQLEAGHaPgJIgjAKAcQPio1twFTmsUTQgcWgeBzS3ACWIkHyGzvwAEuhsb3sAlVAA0mAxKJ9yChgP4UC8FYrDKTcRiwlQS0gyHAB3MIqRQdyVIQAAAABJRU5ErkJggg==">
            </label>
        </div>

        <!-- <div class="img-container"> -->
            <img :src="cmp.info.url" alt="">
        <!-- </div> -->
    

        <div class="content-container">
            <h1>{{cmp.info.title}}</h1>
            <p>{{cmp.info.txt}}</p>
        </div>

        <div class="actions">
            <label @click.stop="copyNote(cmp)">
                <ion-icon name="duplicate-outline"></ion-icon>
            </label>
            <label @click.stop="colorPicker = !colorPicker" @click.stop="setPos">         
                <ion-icon name="color-palette-outline"></ion-icon>
            </label>
            <label @click.stop="onEdit(cmp.id)">         
                <ion-icon name="create-outline"></ion-icon>
            </label>

            <label @click.stop="onDeleteNote(cmp.id)">
                <ion-icon name="trash-outline"></ion-icon>
            </label>
        </div>

        <div class="colors-container" v-if="colorPicker" :style="{position: 'absolute', top: yPos + 15 + 'px', left: xPos - 115 + 'px'}">
            <div class="color" v-for="color in colors" :class="color" 
            @click.stop="onSetColor(color)"></div>
        </div>
    </section>
    `,
    data(){
        return {
            colors: ['grey', 'brown', 'pink', 'purple', 'dark-blue', 'blue', 'turquoise',
                'green', 'yellow', 'orange', 'red', 'none'],
            colorPicker: false,
            xPos: null,
            yPos: null
        }
    },
    methods:{
        onDeleteNote(id) {
            this.$emit('delete', id)
        },
        onEdit(id){
            this.$emit('edit', id)
        },
        pinTheNote(note){
            this.$emit('pin', {...note})
        },
        copyNote(note){
            this.$emit('duplicate', {...note})
        },
        onSetColor(color) {
            this.cmp.style = color;
            this.$emit('color', { ...this.cmp });
        },
        setPos(ev){
            this.xPos = ev.clientX
            this.yPos = ev.clientY
        }
    }
}