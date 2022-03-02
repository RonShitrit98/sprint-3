export default {
    props: ['emails'],
    template: `
        <section>
            <div class="filter-logo">Mail</div>
            <button @click="newEmail">New Email</button>
            <div class="filter-list">
                <ul>
                    <li @click="setFilter('inbox')">Inbox({{unreadEmails}})</li>
                    <li @click="setFilter('sent')">sent({{unopendSentEmails}})</li>
                </ul>
            </div>
        </section>
`, data() {
        return {
            filterBy: null
        }
    },
    methods: {
        newEmail() {
            this.$emit('newEmail')
        },
        setFilter(filterBy){
            // console.log(filterBy)
            this.filterBy = filterBy
            this.$emit('setFilter' , filterBy)
        }
    },
    computed: {
        unreadEmails() {
            return this.emails.filter(email => !email.isRead && email.to === 'momo@momo.com').length
        },
        unopendSentEmails() {
            return this.emails.filter(email => !email.isRead && email.from.address === 'momo@momo.com').length
        }
    }
}
