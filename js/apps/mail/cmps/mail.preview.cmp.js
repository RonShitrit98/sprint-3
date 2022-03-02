export default {
    props: ['email'],
    template: `
          <td>{{email.from.name}}</td>
          <td>{{email.subject}}</td>
          <td>{{emailBodyPrev}}</td>
          <td>{{email.sentAt}}</td>
    `,
    computed:{
        emailBodyPrev(){
            return this.email.body.slice(0,50) + '...'
        },

    }

}