import { bookService } from "../services/books.service.js";
import { eventBus } from '../../../services/eventBus.service.js';
import longText from "../cmps/long-text.cmp.js";
import reviewAdd from "../cmps/review-add.cmp.js";
import bookReview from "../cmps/book-review.cmp.js";

export default {
    template: `
    <section class="details-main-container">
    <section v-if="book" class="book-details-container">
        <img :src="book.thumbnail" class="book-img">

        <div class="book-dets">
            <h2>{{book.title}}</h2>
            <h3>{{book.subtitle}}</h3>

            <p class="book-authors"><span>Authors: </span> {{book.authors[0]}}</p>
            <p><span>Published: </span>{{whenPublished}}</p>
            <p><span>Read type: </span>{{readType}}</p>

            <long-text :txt="book.description" />

            <h5 :class="priceColor"><span>Price: </span> {{formatedPrice}}</h5>

            <div class="books-navigation">
                <router-link :to="'/books/'+book.prevBookId">Prev Book</router-link>
                <router-link to="/books">Back to list</router-link>
                <router-link :to="'/books/'+book.nextBookId">Next Book</router-link>
            </div>
        </div>


    </section>

    <section v-if="book" class="book-reviews" >
        
        <review-add :book="book" @add="onAddReview" />

        <div class="reviews-container">
            <ul>
                <li v-for="review in book.reviews" >
                    <book-review :review="review"  @remove="onDeleteReview"/>
                </li>
            </ul>
        </div>
    </section>
    </section>
    `,
    data() {
        return {
            book: null,
        }
    },
    created() {
        // const id = this.$route.params.bookId;
        // const id = this.bookId;
        // bookService.getBookById(id)
        //     .then(book => this.book = book)
        this.loadBook()
    },
    components: {
        longText,
        reviewAdd,
        bookReview
    },
    methods: {
        onDeleteReview(reviewId) {
            bookService.deleteReview(this.book.id, reviewId)
                .then(book => {
                    const idx = book.reviews.map(rev => rev.id === reviewId)
                    this.book.reviews.splice(idx, 1)
                    eventBus.emit('show-msg', { txt: 'Review deleted', type: 'success' })
                })
                .catch(err => eventBus.emit('show-msg', { txt: 'Delete failed', type: 'error' }))
        },
        onAddReview(review) {
            this.book.reviews.unshift(review)
        },
        loadBook() {
            const id = this.bookId;
            bookService.getBookById(id)
                .then(book => this.book = book)
        }

    },
    computed: {
        formatedPrice() {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: this.book.listPrice.currencyCode }).format(this.book.listPrice.amount)
        },
        readType() {
            if (this.book.pageCount > 500) return ' Long reading';
            else if (this.book.pageCount > 200) return ' Decent reading';
            else if (this.book.pageCount < 100) return ' Light reading';
        },
        whenPublished() {
            if (new Date().getFullYear() - this.book.publishedDate > 10) return ' Veteran Book';
            else if (new Date().getFullYear() - this.book.publishedDate < 1) return ' New!'
        },
        priceColor() {
            if (this.book.listPrice.amount > 150) return 'high-price';
            else if (this.book.listPrice.amount < 20) return 'low-price';
        },
        bookId() {
            return this.$route.params.bookId
        }
    },
    watch: {
        bookId: {
            handler() {
                this.loadBook()
            },
            immediate: true
        }
    }
}