<template>
    <router-view style="height: 100%"></router-view>
</template>

<script>
import * as _ from 'lodash'
import { onRoomChanged, getRoom } from '../game-service'
import { getUsername } from '../storage-service'
import store from '../store'

export default {
    methods: {},
    watch: {},
    computed: {
        room () {
            return this.$store.state.room
        }
    },
    created () {
        this.$router.push({ path: `/${this.room.name}/lobby` })
    },
    beforeRouteEnter (to, from, next) {
        const roomName = to.params.id
        const username = getUsername()

        if (!username) {
            return next('/')
        }

        getRoom(roomName, room => {
            if (room === null) {
                return next('/')
            }
            store.commit('setName', username)
            store.commit('setRoom', room)
            onRoomChanged(roomName, room => store.commit('setRoom', room))
            next()
        })
    }
}
</script>
