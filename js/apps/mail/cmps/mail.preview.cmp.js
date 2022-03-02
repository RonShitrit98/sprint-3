export default {
    props: ['email'],
    template: `
    <router-link :to="email.id">
        <td>{{email.from.name}}</td>
        <td>{{email.subject}}</td>
        <td>{{emailBodyPrev}}</td>
        <td>{{email.sentAt}}</td>
    </router-link>
    `,
    computed:{
        emailBodyPrev(){
            return this.email.body.slice(0,50) + '...'
        },
        
    }

}
