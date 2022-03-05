import { bookService } from '../services/books.service.js';
import { utilService } from '../services/util.service.js';

export default {
    props: ['books'],
    emits: ['newBook'],
    template: `
    <section class="book-add">
        <input type="text" placeholder="Search new book" v-model="searchKeyWord" @input="onShowList">
        <!-- <button @click="showList">Search</button> -->
    
        <ul class="new-book-add-list">
            <li v-for="book in booksList" :key="book.id">
                {{book.title}}
                <button @click="onAddNewBook(book.id)">
                    <ion-icon name="add-circle-outline"></ion-icon>
                </button>
            </li>
        </ul>
    </section>
    `,
    components: {},
    data() {
        return {
            searchKeyWord: '',
            booksList: null,
            onShowList: utilService.debounce(this.showList, 2500)
        }
    },
    methods: {
        showList() {
            console.log(this.searchKeyWord);
            if (!this.searchKeyWord) return
            bookService.getGoogleBook(this.searchKeyWord)
                .then(res => {
                    console.log(res);
                    this.booksList = res
                })
        },
        onAddNewBook(id) {
            const book = this.booksList.find(book => book.id === id)
            bookService.addBook(book)
                .then(res => {
                    console.log(res);
                    this.$emit('newBook', res)
                    this.booksList = null
                    this.searchKeyWord = ''
                })
        },
    },
}