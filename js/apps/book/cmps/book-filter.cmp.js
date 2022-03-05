export default {
    props: [''],
    template: `
    <section class="book-filter">
        <label for="search-by-name">Search:
            <input type="text" v-model="filterBy.name" placeholder="by name">
        </label>
        <label for="search-by-price">Price:
            <input type="number" v-model="filterBy.fromPrice">
        </label>
        <button @click="setFilter" class="btn">Search</button>
    </section>
    `,
    data() {
        return {
            filterBy: {
                name: '',
                fromPrice: 0,
                toPrice: Infinity
            }
        }
    },
    methods: {
        setFilter() {
            this.$emit('filtered', { ...this.filterBy });
            this.filterBy.name = '';
            this.filterBy.fromPrice = 0;
        }

    }
}