export default {
    props: ['book'],
    template: `
    <section class="book-preview">
        <p>Name: {{book.title}}</p>
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