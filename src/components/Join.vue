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
                    <v-ons-col width="60%"><div class="table"> <span>{{roomName}}</span> </div></v-ons-col>
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
import * as firebase from 'firebase'
import * as _ from 'lodash'

export default {
    name: 'Join',
    computed: {
        store () {
            return this.$store
        },
        roomName () {
            const room = this.store.state.rooms.find(
                room => room.index === this.store.state.roomIndex
            )
            return room && room.name
        },
        count () {
            return this.$store.state.count
        }
    },
    created () {
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
        this.db = db

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
            console.log('rooms', rooms)
            this.store.commit('setRooms', rooms)
        })

        var starCountRef = db.ref('state')
        starCountRef.on('value', snapshot => {
            this.store.commit('setGameState', snapshot.val())
        })
    },
    methods: {
        onNameSpecified () {
            this.store.commit('setName', this.name)
            this.goNextPage()
        },
        onRoomSelected (room) {
            this.store.commit('setRoomIndex', room.index);
            this.db.ref('rooms/' + room.index +'/state').on('value', snapshot => {
                const state = snapshot.val();
                if(state === 1) {
                    // this.$router.push({ path: `/play/${room.name}` })
                }
            })
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
            name: 'adasq'
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
