import { eventBus } from '../../../services/eventBus.service.js'
import { mailService } from '../services/mail-service.js'
import mailList from '../cmps/mail-list.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import mailAdd from '../cmps/mail-add.cmp.js'
export default {
    template: `
    <div v-if="emails" class="flex">
        <mail-filter @newEmail="newEmail" @setFilter="filter" :emails="emails"></mail-filter>
        <mail-list :emails="displayEmails"></mail-list>
    </div>
    <mail-add @emailSent="emailSent" v-if="isNewEmail"></mail-add>
    `,
    data() {
        return {
            emails: null,
            isNewEmail: false,
            filterBy: this.$route.params.filterBy,
            userEmail: 'momo@momo.com'
        }
    },
    created(){
        this.unsubscribe = eventBus.on('removeEmail', this.removeEmail)
        mailService.query()
        .then(emails => this.emails= emails)
    },
    computed:{
        displayEmails(){
            if (this.filterBy==='inbox') return this.emails.filter(email => email.to === this.userEmail)
            if (this.filterBy==='sent') return this.emails.filter(email => email.from.address === this.userEmail)
        }
    },
    methods:{
        newEmail(){
            this.isNewEmail = true
            
        }, emailSent(email){
            this.emails.unshift(email)
            this.isNewEmail = false
        },
        filter(filterBy){
            this.filterBy = filterBy
            this.$router.replace({ path: `/mail/${this.filterBy}` })
        },
        removeEmail(id){
            console.log(id)
            mailService.remove(id)
            .then(emails => this.emails = emails)
        }

    },
    components:{
        mailList,
        mailFilter,
        mailAdd
    },
    unmounted(){
        this.unsubscribe()
    }
}

