import keepApp from './apps/keep/pages/keep-app.cmp.js'
import mailApp from './apps/mail/pages/mail-app.cmp.js'
import homePage from './pages/home-page.cmp.js'
import mailDetails from './apps/mail/cmps/mail-details.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/mail/:filterBy',
        component: mailApp,
        children:[{
            path: ':mailId',
            component: mailDetails,
        }]
    },
    {
        path: '/keep',
        component: keepApp
    },

    // {
    //     path: '/book',
    //     component: bookApp
    // },
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})