import mailPreview from './mail.preview.cmp.js'
export default {
    props: ['emails'],
    template: `
    <section class="mail-list">
        <table>
                <tr>
                    <th></th>
                    <th>From</th>
                    <th @click="sortEmails('subject')">Subject</th>
                    <th>Body</th>
                    <th @click="sortEmails('date')">Date</th>
                    <th>Actions</th>
                </tr>  
                    <mail-preview v-for="email in emails" key="email.id" :email="email"/>
        </table>

    </section>
    `,
    components: {
        mailPreview
    },
    methods: {
        sortEmails(sortBy) {
            this.$emit('sortEmails', sortBy)
        }
    }
}

