import { bookService } from "../services/books.service.js";
import { utilService } from '../services/util.service.js';
import { eventBus } from '../../../services/eventBus.service.js';

export default {
    props: ['book'],
    template: `
    <form>
        <label for="reader-name">Name: </label>
        <input type="text" v-model="review.name" id="reader-name" placeholder="Reader Name">
        
        <div class="selection">
            <label for="rate-selection">Rate: </label>
            <select id="rate-selection" class="rate-selection" v-model="review.rate">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
    
            <label for="read-at">Read at: </label>
            <input type="date" id="read-at" v-model="review.date">
        </div>
        
        <label for="review">What do you think about the book?</label>
        <textarea id="review" cols="30" rows="10" v-model="review.txt" placeholder="Write here"></textarea>

        <button @click.prevent="onAddReview">Add review</button>
    </form>
    `,
    created() { },
    data() {
        return {
            review: {
                id: null,
                name: 'Books Reader',
                rate: null,
                date: bookService.getCurrDate(),
                txt: null,
            }
        }
    },
    methods: {
        onAddReview() {
            this.review.id = utilService.makeId(4)
            bookService.addReview(this.book.id, this.review)
                .then(book => {
                    console.log('here');
                    this.$emit('add', this.review)
                    this.review = bookService.getEmptyReview();
                    eventBus.emit('show-msg', { txt: 'Review added!', type: 'success' })
                })
                .catch(err => {
                    console.log('not');
                    eventBus.emit('show-msg', { txt: 'Adding failed', type: 'error' })
                })
        },
    },
}