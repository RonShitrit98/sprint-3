export default {
    template:`
        <header class="app-header">
            <div class="logo">
                <h3>Books</h3>
            </div>
            <nav class="nav-bar">
                <router-link class="nav-link" to="/">Home</router-link> |
                <router-link class="nav-link" to="/books">Book List</router-link> |
                <router-link class="nav-link" to="/about">About</router-link>
            </nav>
        </header>
    
    `
}