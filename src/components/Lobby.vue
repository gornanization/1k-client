<template>
<div class="table-view">
    <div>
                <v-ons-row>
                    <v-ons-col width="20%" class="chair-wrap">
                         <table-chair :position="'first'"></table-chair>
                    </v-ons-col>
                    <v-ons-col width="60%"><div class="table"> <span>{{room && room.name}}</span> </div></v-ons-col>
                    <v-ons-col width="20%" class="chair-wrap">
                         <table-chair :position="'second'"></table-chair>
                    </v-ons-col>
                </v-ons-row>
                <v-ons-row>
                <v-ons-col class="chair-wrap bottom-chair">
                         <table-chair :position="'third'"></table-chair>
                    </v-ons-col>
                </v-ons-row>
        </div>
    </div>
</template>

<script>

import { amISittingHere, everyoneIsSitting } from '../helpers'

export default {
    name: 'Lobby',
    beforeRouteEnter (to, from, next) {
        next()
    },
    computed: {
        store () {
            return this.$store
        },
        state () {
            return this.store.state
        },
        room () {
            return this.state.room
        }
    },
    watch: {
        room (newVal, oldVal) {
            this.onRoomChanged()
        }
    },
    created () {
        console.log('Lobby created')
        this.onRoomChanged()
    },
    methods: {
        onRoomChanged () {
            const iAmSittingHere = amISittingHere(this.room, this.state.name)
            const everyOneIsSittingHere = everyoneIsSitting(this.room)

            console.log('iAmSittingHere:', iAmSittingHere)
            console.log('everyOneIsSittingHere', everyOneIsSittingHere)

            if (iAmSittingHere && everyOneIsSittingHere) {
                this.$router.push({ path: `/${this.room.name}/game` })
            }
        }
    },
    data () {
        return {
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chair-wrap {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.table-view {
    perspective: 800px;
    display: flex;
    flex-direction: row;
    align-items: center;

    div {
        width: 100%;
    }
    .table {
        transform: rotate3d(1, 0, 0, 40deg);
        background: lightgreen;
        height: 100px;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
    }
}
</style>
