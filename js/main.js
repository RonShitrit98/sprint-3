import {router} from './router.js'
import appHeader from './cmps/app-header.cmp.js';
import appFooter from './cmps/app-footer.cmp.js';
import userMsg from './cmps/user-msg.cmg.js';

const options = {
    template: `
    <app-header></app-header>
    <user-msg class="user-msg"></user-msg>
    <router-view></router-view>
    <!-- <app-footer></app-footer> -->
    `,
    components: {
        appHeader,
        appFooter,
        userMsg
    }

}


const app = Vue.createApp(options);
app.use(router)
app.mount('#app')