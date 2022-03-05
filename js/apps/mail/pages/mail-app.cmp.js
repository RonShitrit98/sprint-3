import { eventBus } from '../../../services/eventBus.service.js'
import { mailService } from '../services/mail-service.js'
import mailList from '../cmps/mail-list.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import mailAdd from '../cmps/mail-add.cmp.js'
import mailDetails from '../cmps/mail-details.cmp.js'
import mailSearch from '../cmps/mail-search.cmp.js'

export default {
    template: `
        <section class="mail main-layout">
            
            <div v-if="emails" class="flex">
                <mail-filter @newEmail="newEmail" @setFilter="filter" :emails="emails"></mail-filter>
                <div>
                    <mail-search  class="flex" @filterByRead="filterRead" @search="searchEmails"></mail-search>
                    <mail-list v-if="!isMailClicked" @sortEmails="sortEmails" :emails="displayEmails"></mail-list>
                    <mail-details @update="updateEmail" v-if="isMailClicked"></mail-details>
                </div>
            </div>
            <mail-add @close="newEmailClose" @emailSent="emailSent" v-if="isNewEmail"></mail-add>
        </section>
    `,
    data() {
        return {
            emails: null,
            isNewEmail: false,
            userEmail: null,
            filterBy: {
                mailBox: this.$route.params.filterBy,
                sort: null,
                search: null,
                read: 'all'
            },
        }
    },
    created() {
        this.unsubscribe = eventBus.on('removeEmail', this.removeEmail)
        mailService.query()
            .then(emails => this.emails = emails)
        mailService.getUser()
            .then(user => {
                this.userEmail = user[0].email
            })
    },
    computed: {
        displayEmails() {
            return mailService.filter(this.emails, this.userEmail, this.filterBy)
        },
        isMailClicked() {
            return this.$route.params.mailId
        }
    },
    methods: {
        newEmail() {
            this.isNewEmail = true

        }, emailSent(email) {
            this.emails.unshift(email)
            this.isNewEmail = false
        },
        filter(filterBy) {
            this.filterBy.mailBox = filterBy
            this.$router.replace({ path: `/mail/${this.filterBy.mailBox}` })
        },
        removeEmail(id) {
            mailService.remove(id)
                .then(emails => {
                    this.emails = emails
                    eventBus.emit('show-msg', { type: 'success', txt: 'Mail removed' })
                })
                .catch(() => {
                    eventBus.emit('show-msg', { type: 'erorr', txt: 'Somthing went wrong, please try again' })
                })
        },
        sortEmails(sortBy) {
            this.filterBy.sortBy = sortBy
        },
        searchEmails(searchBy) {
            this.$router.replace({ path: `/mail/${this.filterBy.mailBox}` })
            this.filterBy.searchBy = searchBy
        },
        filterRead(filterBy) {
            this.filterBy.read = filterBy
        },
        updateEmail(email) {
            const idx = this.emails.findIndex(mail => email.id === mail.id);
            this.emails.splice(idx, 1, email)
        },
        newEmailClose() {
            this.isNewEmail = false
        }

    },
    components: {
        mailList,
        mailFilter,
        mailAdd,
        mailDetails,
        mailSearch
    },
    unmounted() {
        this.unsubscribe()
    }
}

