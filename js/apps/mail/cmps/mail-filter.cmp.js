export default {
    props: ['emails'],
    template: `
        <section class="mail-filter flex direction-column">
            <div class="filter-logo">Mail</div>
            <button @click="newEmail">New Email</button>
            <div class="filter-list">
                <ul>
                    <li :class="inboxClass" @click="setFilter('inbox')">Inbox {{unreadEmails}}</li>
                    <li @click="setFilter('sent')">sent {{unopendSentEmails}}</li>
                    <li @click="setFilter('star')">Starred</li>
                </ul>
            </div>
        </section>
`, data() {
        return {
            filterBy: 'inbox'
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
            const read = this.emails.filter(email => !email.isRead && email.to === 'momo@momo.com').length
            if(!read) return
            return read
        },
        unopendSentEmails() {
            const sent = this.emails.filter(email => !email.isRead && email.from.address === 'momo@momo.com').length
            if(!sent) return
            return sent
        },
        inboxClass(){
            console.log(this.filterBy)
            if(this.filterBy === 'inbox') return 'marked'
        }
    }
}
