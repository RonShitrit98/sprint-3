import { eventBus } from '../../../services/eventBus.service.js'
import { mailService } from '../services/mail-service.js'

export default {
    props: ['email'],
    template: `
    <!-- <router-link :to="'/mail/'+email.id"> -->
    <tr v-if="email" @click.stop.prevent="goToEmail" :class="emailClass">
        <td><label class="stars" @click.stop="starEmail"><img :src="starIcon"></label></td>
        <td>{{email.from.name}}</td>
        <td>{{email.subject}}</td>
        <td>{{emailBodyPrev}}</td>
        <td>{{emailDate}}</td>
        <td><button @click.stop="removeEmail">X</button></td>
    </tr>
    <!-- </router-link>   -->
    `,
    computed: {
        emailBodyPrev() {
            if(!this.email.body) return 
            return this.email.body.slice(0, 100) + '...'
        },
        emailClass() {
            const { isRead } = this.email
            if (!isRead) return 'mail-preview email-unread'
            if (isRead) return 'mail-preview email-read'
        },
        emailDate() {
            const months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December" ]
            const date = new Date(this.email.sentAt)
            return `${months[date.getMonth()]} ${date.getDate()}`
        },
        starIcon(){
            if(this.email.isStarred) return '../../../../img/mail-imgs/starred.png'
            return '../../../../img/mail-imgs/notStarred.png'
        }
    },
    methods: {
        goToEmail() {
            this.$router.push(`${this.$route.params.filterBy}/${this.email.id}`)
        },
        removeEmail(){
            // console.log('removing')
            eventBus.emit('removeEmail', this.email.id)
        },
        starEmail(){
            var isStarred = true
            if (this.email.isStarred) isStarred = false
                          this.email.isStarred = isStarred
                          mailService.updateEmail(this.email)
                          this.$emit('update', this.email)
        }
    }

}

// created() {
//     const id = this.$route.params.mailId
//     mailService.get(id)
//       .then(email => {
//         if (!email.isRead) {
//           email.isRead = true
//           mailService.updateEmail(email)
//           this.$emit('update', email)
//         }
//         this.email = email
//       })


