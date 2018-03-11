import Vue from 'vue'
import Router from 'vue-router'
import Join from '@/components/Join'
import TableChair from '@/components/TableChair'
import Cards from '@/components/Cards'
import Lobby from '@/components/Lobby'
import Base from '@/components/Base'
import Game from '@/components/Game'

Vue.use(Router)
Vue.component('table-chair', TableChair)
Vue.component('cards', Cards)

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
