export default {
    props: ['email'],
    template: `
    <!-- <router-link :to="'/mail/'+email.id"> -->
    <tr v-if="email" @click="goToEmail" :class="emailClass">
        <td>{{email.from.name}}</td>
        <td>{{email.subject}}</td>
        <td>{{emailBodyPrev}}</td>
        <td>{{emailDate}}</td>
    </tr>
    <!-- </router-link>   -->
    `,
    computed: {
        emailBodyPrev() {
            if(!this.email.body) return 
            return this.email.body.slice(0, 160) + '...'
        },
        emailClass() {
            const { isRead } = this.email
            if (!isRead) return 'email-unread'
            if (isRead) return 'email-read'
        },
        emailDate() {
            const months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December" ]
            const date = new Date(this.email.sentAt)
            return `${months[date.getMonth()]} ${date.getDate()}`
        }
    },
    methods: {
        goToEmail() {
            this.$router.push(`${this.$route.params.filterBy}/${this.email.id}`)
        }
    }

}


