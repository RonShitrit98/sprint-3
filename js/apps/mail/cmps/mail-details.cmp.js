import { mailService } from '../services/mail-service.js'
export default {
  template: `
    <section class="mail-details" v-if="email">
      <div>
          <router-link :to="returnAddress"><img src="./img/mail-imgs/arrow.png"/></router-link>
      </div>
        <h1 class="mail-subject">{{email.subject}}</h1>
        <p><span>{{email.from.name}}</span>&lt{{email.from.address}}></p>
        <pre>{{email.body}}</pre>
    </section>
   ` ,
  data() {
    return {
      email: null,
    }
  },
  created() {
    const id = this.$route.params.mailId
    mailService.get(id)
      .then(email => {
        console.log(email)
        if (!email.isRead) {
          email.isRead = true
          mailService.updateEmail(email)
          this.$emit('update', email)
        }
        this.email = email
      })
  },
  computed: {
    returnAddress() {
      return `/mail/${this.$route.params.filterBy}`
    }
  }
}
