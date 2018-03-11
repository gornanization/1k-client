<template>
  <v-ons-page>
<v-ons-carousel fullscreen auto-scroll overscrollable :index.sync="carouselIndex">
    <v-ons-carousel-item class="login-view">
          <div class="form-wrap">
            <v-ons-input v-model="name" id="username" modifier="underbar" placeholder="Username" float></v-ons-input>
            <ons-button modifier="large outline" v-on:click="onNameSpecified()">Join</ons-button>
        </div>
    </v-ons-carousel-item>

    <v-ons-carousel-item>
        <v-ons-list modifier="inset">
            <v-ons-list-header>Choose Table</v-ons-list-header>
            <v-ons-list-item v-on:click="onRoomSelected(room)" :key="room.name" v-for="room in store.state.rooms" modifier="longdivider">
                {{room.name}}
            </v-ons-list-item>
        </v-ons-list>
    </v-ons-carousel-item>

    <v-ons-carousel-item class="table-view">
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
    </v-ons-carousel-item>
  </v-ons-carousel>
     </v-ons-page>
</template>

<script>
import * as _ from 'lodash'
import { amISittingHere, everyoneIsSitting } from '../helpers'
import { db, onRoomsChanged } from '../game-service'
import { getUsername, setUsername } from '../storage-service'

export default {
    name: 'Join',
    computed: {
        store () {
            return this.$store
        },
        state () {
            return this.store.state
        },
        room () {
            return this.store.getters.room
        },
        count () {
            return this.$store.state.count
        }
    },
    watch: {
        room (newVal, oldVal) {
            const iAmSittingHere = amISittingHere(newVal, this.state.name)
            const everyOneIsSittingHere = everyoneIsSitting(newVal)

            // console.log('iAmSittingHere:', iAmSittingHere)
            // console.log('everyOneIsSittingHere', everyOneIsSittingHere)

            if (iAmSittingHere && everyOneIsSittingHere) {
                this.$router.push({ path: `/${this.room.name}` })
            }
        }
    },
    created () {
        this.db = db
        onRoomsChanged(rooms => this.store.commit('setRooms', rooms))
    },
    methods: {
        onNameSpecified () {
            this.store.commit('setName', this.name)
            setUsername(this.name)
            this.goNextPage()
        },
        onRoomSelected (room) {
            this.store.commit('setRoomIndex', room.index)
            this.goNextPage()
        },
        goNextPage () {
            this.carouselIndex++
        }
    },
    data () {
        return {
            db: null,
            carouselIndex: 0,
            name: getUsername() || ''
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login-view {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .form-wrap {
        justify-content: space-between;
        display: flex;
        flex-direction: column;
        height: 80px;
    }
}

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
