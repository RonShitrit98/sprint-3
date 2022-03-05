export default {
    props: ['emails'],
    template: `
        <div class="mail-filter flex direction-column">
            <button class="new-mail-btn" @click="newEmail">
                <img src="./img/mail-imgs/plus.png"/>Compose</button>
            <div class="filter-list">
                <ul>
                    <li :class="inboxClass" @click="setFilter('inbox')">
                        <img :src="inboxImg"/>
                        Inbox {{unreadEmails}}</li>
                    <li :class="sentClass" @click="setFilter('sent')">
                        <img :src="sentImg"/>
                        sent {{unopendSentEmails}}</li>
                    <li :class="starClass" @click="setFilter('star')">
                        <img :src="starImg"/>Starred</li>
                    <li :class="draftClass" @click="setFilter('drafts')">
                        <img src="./img/mail-imgs/draft.png"/>drafts</li>
                </ul>
            </div>
        </div>
`, data() {
        return {
            filterBy: this.$route.params.filterBy,
            starImg: './img/mail-imgs/star.png',
            sentImg: './img/mail-imgs/sent.png',
            inboxImg: './img/mail-imgs/inbox.png'

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
            const read = this.emails.filter(email => !email.isRead && email.to === 'momo@momo.com'&&!email.isDraft).length
            if(!read) return
            return read
        },
        unopendSentEmails() {
            const sent = this.emails.filter(email => !email.isRead && email.from.address === 'momo@momo.com'&&!email.isDraft).length
            if(!sent) return
            return sent
        },
        inboxClass(){
            if(this.filterBy === 'inbox') return 'marked'
        },
        sentClass(){
            if(this.filterBy === 'sent') return 'marked'
        },
        starClass(){
            if(this.filterBy === 'star') return 'marked'
        },
        draftClass(){
            if(this.filterBy === 'drafts') return 'marked'
        }
    }
}
