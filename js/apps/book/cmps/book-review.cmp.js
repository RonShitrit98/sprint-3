export default {
    props: ['review'],
    template: `
    <section class="review">

        <div class="reader-dets">
            <button @click="remove(review.id)">delete</button>
            <h5 class="reader-name">{{review.name}}</h5>
            <h6>{{review.rate}}</h6>
        </div>
        
        <p class="review-txt">
            {{review.txt}}
        </p>
        
        <h5 class="review-date">
            {{review.date}}
        </h5>
        
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