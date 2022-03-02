import { mailService } from '../services/mail-service.js'
export default {
    template: `
    <section v-if="email">
        <router-link :to="returnAddress">Back</router-link>
        <h1>{{email.subject}}</h1>
        <p><h3>{{email.from.name}}</h3>{{email.from.address}}</p>
        <p>{{email.body}}</p>
    </section>
   ` ,
      data(){
      return{
        email: null,
      }
    },
  created() {
    const id = this.$route.params.mailId
    mailService.get(id)
      .then(email => {
          if(!email.isRead){
              email.isRead = true
              mailService.updateEmail(email)
          } 
          this.email = email
      })
  },
  computed:{
    returnAddress(){
      return `/mail/${this.$route.params.filterBy}`
    }
  }
}
