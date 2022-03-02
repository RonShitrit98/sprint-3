export default {
    props:['cmp'],
    emits:['delete'],
    template:`
    <h1>{{cmp.info.label}}</h1>
    <button @click="onDeleteNote(cmp.id)">X</button>
    `,
    data(){
        return {
            
        }
    },
    methods:{
        onDeleteNote(id) {
            this.$emit('delete', id)
        }
    }
}