import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0,
        rooms: [],
        roomIndex: null,
        gameState: {},
        name: 'adam'
    },
    mutations: {
        increment (state) {
            state.count++
        },
        setRooms (state, rooms) {
            state.rooms = rooms
        },
        setName (state, name) {
            state.name = name
        },
        setRoomIndex (state, i) {
            state.roomIndex = i
        },
        setGameState (state, gameState) {
            state.gameState = gameState
        }
    }
})
