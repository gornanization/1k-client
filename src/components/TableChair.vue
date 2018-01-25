<template>
    <div>
        <v-ons-icon v-if="isReservedByOtherPlayer()" class="reserved-icon" icon="ion-person"></v-ons-icon>
        <v-ons-button modifier="quiet" v-if="isNotReserved() && !iAmSittingHere()" v-on:click="sit()">Sit</v-ons-button>
        <v-ons-button modifier="quiet" v-if="isReservedByMe()" v-on:click="stand()">Stand</v-ons-button>
    </div>
</template>

<script>
// import * as _ from 'lodash'
import * as firebase from 'firebase'

export default {
    name: 'TableChair',
    props: ['position'],
    computed: {
        store () {
            return this.$store
        },
        room () {
            return this.state.rooms.find(room => room.index === this.state.roomIndex)
        },
        state () {
            return this.store.state
        }
    },
    created () {},
    methods: {
        iAmSittingHere () {
            const room = this.room
            const name = this.state.name
            return room.first === name || room.second === name || room.third === name
        },
        isReservedByOtherPlayer () {
            const room = this.room
            return room && room[this.position] && room[this.position] !== this.state.name
        },
        isReservedByMe () {
            const room = this.room
            return room && room[this.position] && room[this.position] === this.state.name
        },
        isNotReserved () {
            const room = this.room
            return room && !room[this.position]
        },
        updatePos (val) {
            firebase
                .database()
                .ref('/rooms/' + this.state.roomIndex)
                .update({
                    [this.position]: val
                })
        },
        sit () {
            this.updatePos(this.state.name)
            firebase.database().ref('/rooms/' + this.state.roomIndex).onDisconnect().update({
                [this.position]: null
            });
        },
        stand () {
            this.updatePos(null)
        }
    },
    data () {
        return {}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.reserved-icon {
    font-size: 10vw;
    color: #ccc;
}
</style>
