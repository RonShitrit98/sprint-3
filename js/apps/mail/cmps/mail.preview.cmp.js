import { eventBus } from '../../../services/eventBus.service.js'
import { mailService } from '../services/mail-service.js'

export default {
    props: ['email'],
    template: `
    <!-- <router-link :to="'/mail/'+email.id"> -->
    <tr v-if="email" @click="goToEmail" :class="emailClass" >
        <td><label class="stars" @click.stop="starEmail"><img :src="starIcon"></label></td>
        <td>{{email.from.name}}</td>
        <td>{{email.subject}}</td>
        <td>{{emailBodyPrev}}</td>
        <td>{{emailDate}}</td>
        <td><label @mouseover="removeHover" @mouseleave="mouseLeft" class="stars" @click.stop="removeEmail">
            <img :src="removeImg"></label></td>
    </tr>
    <!-- </router-link>   -->
    `,
    data() {
        return {
            removeImg: './img/mail-imgs/bin.png',
            removeImgHover: './img/mail-imgs/bin-hover.png'
        }
    },
    computed: {
        emailBodyPrev() {
            if (!this.email.body) return
            return this.email.body.slice(0, 100) + '...'
        },
        emailClass() {
            const { isRead } = this.email
            if (!isRead) return 'mail-preview email-unread'
            if (isRead) return 'mail-preview email-read'
        },
        emailDate() {
            const months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"]
            const date = new Date(this.email.sentAt)
            return `${months[date.getMonth()]} ${date.getDate()}`
        },
        starIcon() {
            if (this.email.isStarred) return './img/mail-imgs/starred.png'
            return './img/mail-imgs/notStarred.png'
        }
    },
    methods: {
        goToEmail() {
            if(this.email.isDraft){
                eventBus.emit('editDraft', this.email)
                this.$router.replace({name: `new`, params:{new:'draft'}})
            }
            else this.$router.replace(`/mail/${this.$route.params.filterBy}/${this.email.id}`)
        },
        removeEmail() {
            eventBus.emit('removeEmail', this.email.id)
        },
        starEmail() {
            var txt = 'Mail is starred'
            var isStarred = true
            if (this.email.isStarred){
                isStarred = false
                txt = 'Mail is unstarred'
            } 
            this.email.isStarred = isStarred
            mailService.updateEmail(this.email)
            .then(()=>{
                eventBus.emit('show-msg', {type: 'success', txt})
            })
            .catch(()=>{
                eventBus.emit('show-msg', {type: 'erorr', txt: 'Somthing went wrong, please try again'})
            })
            this.$emit('update', this.email)
        },
        removeHover() {
            this.removeImg = './img/mail-imgs/bin-hover.png'
        },
        mouseLeft() {
            this.removeImg = './img/mail-imgs/bin.png'
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


