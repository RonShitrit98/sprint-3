import mailPreview from './mail.preview.cmp.js'
export default {
    props: ['emails'],
    template: `
    <section>
        <table>
                <tr>
                    <th>From</th>
                    <th>Subject</th>
                    <th>Body</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>  
              <mail-preview v-for="email in emails" key="email.id" :email="email"/>
              
            <!-- <li v-for="email in emails">
        
            </li> -->
        </table>

    </section>
    `,
    components:{
        mailPreview
    },
    methods: {
        // openEmail(){
        //     this.$router.push(`/${this.email.id}`)
        }
    }

