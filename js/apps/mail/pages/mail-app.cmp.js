import { mailService } from '../services/mail-service.js'
import mailList from '../cmps/mail-list.cmp.js'
export default {
    template: `
    <mail-list v-if="emails" :emails="emails"></mail-list>
    `,
    data() {
        return {
            emails: null

        }
    },
    created(){
        mailService.query()
        .then(emails => this.emails= emails)
    },
    components:{
        mailList,
    }
}
