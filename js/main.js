import {router} from './router.js'
import appHeader from './cmps/app-header.cmp.js';
import appFooter from './cmps/app-footer.cmp.js';

const options = {
    template: `
    <app-header></app-header>
    <user-msg></user-msg>
    <router-view></router-view>
    <app-footer></app-footer>
    `,
    components: {
        appHeader,
        appFooter
    }

}


const app = Vue.createApp(options);
app.use(router)
app.mount('#app')