import Vue from 'vue'
import Router from 'vue-router'
import Join from '@/components/Join'
import TableChair from '@/components/TableChair'
import Cards from '@/components/Cards'
import Card from '@/components/Card'
import Lobby from '@/components/Lobby'
import Base from '@/components/Base'
import Game from '@/components/Game'
import Bid from '@/components/Bid'
import Options from '@/components/Options'
import Notification from '@/components/Notification'

Vue.use(Router)
Vue.component('table-chair', TableChair)
Vue.component('cards', Cards)
Vue.component('card', Card)
Vue.component('bid', Bid)
Vue.component('options', Options)
Vue.component('notification', Notification)

export default new Router({
    routes: [
        {
            path: '/:id',
            component: Base,
            children: [
                { path: 'lobby', component: Lobby },
                { path: 'game', component: Game }
            ]
        },
        {
            path: '/',
            name: 'Join',
            component: Join
        }
    ]
})
