export default {
    emits: ['filter'],
    template: `
    <section class="filter-notes">

        <label for="type">Search: </label>
        <input type="search" @input="onSearchNotes" v-model="searchBy" 
        placeholder="Enter key words">

        <select class="type-filter" v-model="value" @change="onFilterNotes">
            <option value="">All</option>
            <option value="note-txt">Text</option>
            <option value="note-img">Image</option>
            <option value="note-todos">List</option>
            <option value="note-video">Video</option>
        </select>

    </section>
    `,
    data() {
        return {
            value:'',
            searchBy: null
        }
    },
    methods: {
        onFilterNotes() {
            console.log(this.value);
            this.$emit('filter', this.value)
        },
        onSearchNotes() {
            console.log(this.searchBy);
            this.$emit('filter', this.searchBy)
        }
    }
}