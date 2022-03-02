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
          </tr>  
          <tr v-for="email in emails">
              <mail-preview :email="email"/>
          </tr>
            <!-- <li v-for="email in emails">
        
            </li> -->
        </table>

    </section>
    `,
    components:{
        mailPreview
    }
}
