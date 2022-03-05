export default {
    props: ['txt'],
    template: `
    <p><span>Description: </span>{{txtToShow}}</p>
    <button @click="toggleMoreLess" class="btn show-more-btn">{{moreOrLess}}</button>
    `,
    data() {
        return {
            showMore: false,
            numWords: this.txt.split(' '),
        }
    },
    methods: {
        toggleMoreLess() {
            var show = this.showMore;
            this.showMore = !show;
        }
    },
    computed: {
        txtToShow() {
            if (this.showMore) return this.txt;
            else {
                var str = '';
                var idx = 0;
                while (str.length < 100) {
                    str += this.numWords.concat()[idx] + ' ';
                    idx++
                }
                return str
            }
        },
        moreOrLess() {
            if (this.showMore) return 'Show Less';
            else return 'Show More';
        }
    }
}