import { eventBus } from '../../../services/eventBus.service.js'
import { mailService } from '../services/mail-service.js'
export default {
    template: `
        <div class="mail-add">
            <div class="message-title">
                <p>New Message</p>
                <label @click="close">X</label>
            </div>
            <form> 
                <input class="new-mail-to" v-model="email.to" type="text" placeholder="To">
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
                id: null,
                isDraft: true
            }
        }
    },
    created() {
        this.unsubscribe = eventBus.on('editDraft', this.editDraft)
    },
    methods: {
        newEmail() {
            this.$emit('newEmail')
        },
        sendEmail() {
            this.email.isDraft = false
            mailService.newEmail(this.email)
                .then((email) => {
                    this.$emit('emailSent', email)
                    eventBus.emit('show-msg', { type: 'success', txt: 'Mail sent' })
                })
                .catch(() => {
                    eventBus.emit('show-msg', { type: 'erorr', txt: 'Somthing went wrong, please try again' })
                })
        },
        close() {
            mailService.newEmail(this.email)
                .then((email) => {
                    eventBus.emit('show-msg', { type: 'success', txt: 'Mail seved to drafts' })
                    this.$emit('close', email)
                })
        },
        editDraft(email){
            this.email = email
            console.log(this.email)
        }

    },

    computed: {
        unreadEmails() {
            return this.emails.filter(email => !email.isRead).length
        },
        unmounted() {
            this.unsubscribe()
        }
    }
}
