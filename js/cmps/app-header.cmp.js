export default {
    template: `
    <section class="app-header">
        <h1>Header!</h1>
        <div class="link-container">
            <router-link class="nav-link" to="/">Home</router-link>
            <router-link class="nav-link" to="/keep">Keep</router-link>
            <router-link class="nav-link" to="/mail/inbox">Mail</router-link>
        </div>
    </section>
    `
}