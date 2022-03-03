export default {
    template: `
    <section>
        <input @input="search" v-model="searchBy" type="text"/>
        <select v-model="filterRead" @change="filterByRead">
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
        </select>
    </section>
    `,
data(){
    return{
        searchBy: null,
        filterRead: 'all'
    }
},
    methods:{
        search(){
            this.$emit('search', new RegExp(this.searchBy, 'i'))
        },
        filterByRead(){
            this.$emit('filterByRead', this.filterRead)
        }
    }
}