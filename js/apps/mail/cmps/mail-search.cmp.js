export default {
    template: `
    <section class="mail-search">
        <form @action.prevent>
            <input @input="search" v-model="searchBy" type="text"/>
            <select v-model="filterRead" @change="filterByRead">
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
            </select>
        </form>
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