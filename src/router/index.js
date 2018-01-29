import Vue from 'vue'
import Router from 'vue-router'
import Join from '@/components/Join'
import TableChair from '@/components/TableChair'
import Cards from '@/components/Cards'
import * as firebase from 'firebase'
import * as _ from 'lodash'
import store from '../store'

Vue.use(Router)
Vue.component('table-chair', TableChair)

const config = {
    apiKey: 'AIzaSyAy77CMasWX4GKuE1nGmpinB8C0XybDYkA',
    authDomain: 'thousand-53a5a.firebaseapp.com',
    databaseURL: 'https://thousand-53a5a.firebaseio.com',
    projectId: 'thousand-53a5a',
    storageBucket: '',
    messagingSenderId: '542599085794'
}

firebase.initializeApp(config)

const db = firebase.database()

db.ref('rooms').on('value', snapshot => {
    const rooms = _.chain(snapshot.val())
        .map((val, i) => {
            if (val) {
                val.index = i
            }
            return val
        })
        .compact()
        .value()
    store.commit('setRooms', rooms)
})

db.ref('state').update({
    settings: {
        permitBombOnBarrel: true,
        maxBombs: 2,
        barrelPointsLimit: 880
    },
    phase: 'BATTLE_START',
    players: [
        { id: 'adam', battlePoints: [120, null] },
        { id: 'alan', battlePoints: [0, 60] },
        { id: 'pic', battlePoints: [0, 60] }
    ],
    deck: [],
    stock: [],
    bid: [
        { player: 'alan', bid: 0, pass: true },
        { player: 'adam', bid: 0, pass: true },
        { player: 'pic', bid: 100, pass: false }
    ],
    cards: {
        'adam': ['9♥', '10♥', 'J♥', 'Q♥', 'K♥', 'A♥', '9♠', '10♠'],
        'alan': ['9♦', '10♦', 'J♦', 'Q♦', 'K♦', 'A♦', 'J♠', 'Q♠'],
        'pic':  ['9♣', '10♣', 'J♣', 'Q♣', 'K♣', 'A♣', 'K♠', 'A♠']
    },
    battle: {
        trumpAnnouncements: [],
        leadPlayer: 'pic',
        trickCards: [],
        wonCards: {
            adam: [],
            pic: [],
            alan: []
        }
    }
})

db.ref('state').on('value', snapshot => {
    store.commit('setGameState', snapshot.val())
})

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
