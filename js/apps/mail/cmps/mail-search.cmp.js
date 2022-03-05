import mailFilter from './mail-filter.cmp.js'
export default {
    template: `
    <section class="mail-search flex space-between">
        <!-- <form @action.prevent> -->
            <div>
                <input @input="search" v-model="searchBy" type="text"/>
                <select v-model="filterRead" @change="filterByRead">
                    <option value="all">All</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                </select>
            </div>
            <div class="filter-menu" @click="toggleMenu">
                <img src="./img/mail-imgs/menu.png">
            </div>
        <!-- </form> -->
    </section>
    `,
    data() {
        return {
            searchBy: null,
            filterRead: 'all',
            isMenuOpen: false
        }
    },
    components: {
        mailFilter
    },
    methods: {
        search() {
            this.$emit('search', new RegExp(this.searchBy, 'i'))
        },
        filterByRead() {
            this.$emit('filterByRead', this.filterRead)
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
            this.$emit('openMenu')
        }
    }
}