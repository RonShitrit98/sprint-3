export default {
    props: ['review'],
    template: `
    <section class="review">

        <div class="reader-dets">
            <h5 class="reader-name">Name: {{review.name}}</h5>
            <h6>Rate: {{review.rate}}</h6>
            
            <p class="review-txt">
                {{review.txt}}
            </p>
            
            <h5 class="review-date">
                {{review.date}}
            </h5>
        </div>

        <button @click="remove(review.id)">delete</button>
        
    </section>
    `,
    methods: {
        remove(id) {
            this.$emit('remove', id)
        }
    },
    computed: {

    }

}