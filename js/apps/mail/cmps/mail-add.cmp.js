import { mailService } from '../services/mail-service.js'
export default {
    props: ['emails'],
    template: `
        <div>
            <form> 
                <div><input v-model="email.to" type="text"/></div>
                <div><input v-model="email.subject" type="text"/></div>
                <div><input v-model="email.body" type="text" class="new-email-body"/></div> 
                <input @click.prevent="sendEmail" type="submit">
            </form>
        </div>
`,
    data() {
        return{
            email: {
               to: null,
               subject: null,
               body: null,
               id: null
            }
        }
    },
    methods: {
        newEmail() {
            this.$emit('newEmail')
        },
        sendEmail(){
            mailService.newEmail(this.email)
            .then((email)=>{
                this.$emit('emailSent', email)
            })
        }
// test(){
//     console.log(this.email)
// }
    },

    computed: {
        unreadEmails() {
            return this.emails.filter(email => !email.isRead).length
        }
    }
}
