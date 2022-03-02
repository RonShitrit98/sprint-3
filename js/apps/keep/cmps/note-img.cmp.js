export default {
    props:['cmp'],
    template:`
    <h1>{{cmp.info.title}}</h1>
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