import Vue from 'vue'
import Router from 'vue-router'
import Join from '@/components/Join'
import TableChair from '@/components/TableChair'
import Cards from '@/components/Cards'

Vue.use(Router)
Vue.component('table-chair', TableChair)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Join',
            component: Join
        },
        {
            path: '/play/:id',
            name: 'Cards',
            component: Cards
        }
    ]
})
