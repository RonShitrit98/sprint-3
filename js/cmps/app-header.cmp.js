export default {
    template: `
    <section class="app-header">
        <router-link to="/"><img class="main-logo" src="../img/designs/logo.png"/></router-link>
        <nav class="main-nav link-container">
            <router-link class="nav-link mail-link" to="/mail/inbox"><span>M</span>ail</router-link>
            <router-link class="nav-link book-link" to="/"><span>B</span>ooks</router-link>
            <router-link class="nav-link note-link" to="/keep"><span>N</span>otes</router-link>
        </nav>
    </section>
    `
}