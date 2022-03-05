import { bookService } from '../services/books.service.js';
import bookList from '../cmps/book-list.cmp.js';
import bookFilter from '../cmps/book-filter.cmp.js';
import bookAdd from '../cmps/book-add.cmp.js';


export default {
    template: `
    <section class='books-app'>
        <book-filter @filtered='setFilter' />
        <book-Add :books="books" @newBook="addNewBook"></book-Add>
        <book-list :books='booksForDisplay' />
    </section>
    `,
    components: {
        bookList,
        bookFilter,
        bookAdd
    },
    data() {
        return {
            books: null,
            filterBy: null,
        }
    },
    created() {
        bookService.query()
            .then(books => this.books = books);
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        addNewBook(book) {
            this.books.unshift(book)
        }
    },
    computed: {
        booksForDisplay() {
            if (!this.filterBy) return this.books;
            const regex = new RegExp(this.filterBy.name, 'i');
            return this.books.filter(book => {
                if ((regex.test(book.title)) &&
                    (book.listPrice.amount >= this.filterBy.fromPrice)) return book
            });
        }
    },
};