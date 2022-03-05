import { mailService } from '../services/mail-service.js'
export default {
    props: ['emails'],
    template: `
        <div class="mail-add">
            <div class="message-title">
                <p>New Message</p>
                <label @click="close">X</label>
            </div>
            <form> 
                <input class="new-mail-to" v-model="email.to" type="text" placeholder="To"/>
                <input class="new-mail-subject" v-model="email.subject" type="text" placeholder="Subject"/>
                <textarea class="new-mail-body" v-model="email.body" type="text"></textarea>
                <input class="send-mail-btn" @click.prevent="sendEmail" type="submit">
            </form>
        </div>
`,
    data() {
        return {
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
        sendEmail() {
            mailService.newEmail(this.email)
                .then((email) => {
                    console.log('boop')
                    this.$emit('emailSent', email)
                })
        },
        close() {
            this.$emit('close')
        }
 
    },

    computed: {
        unreadEmails() {
            return this.emails.filter(email => !email.isRead).length
        }
    }
}
