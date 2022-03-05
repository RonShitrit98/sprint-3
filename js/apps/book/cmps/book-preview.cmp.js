export default {
    props: ['book'],
    template: `
    <section class="book-preview">
        <img :src="book.thumbnail" alt="">
        <h4>{{book.title}}</h4>
        <p>Price: {{formatedPrice}}</p>
    </section>
    `,
    data() {
        return {
            price: this.book.listPrice.amount,
            currency: this.book.listPrice.currencyCode,
        }
    },
    computed: {
        formatedPrice() {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: this.currency }).format(this.price)
        }
    }
}