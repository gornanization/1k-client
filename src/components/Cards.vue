<template>
    <div>
       <p>
           <strong>{{ player }}</strong> 
           cards of  
           <strong>{{ room.name }}</strong> 
           table displayed here
       </p>
       <p>
           {{ gameState.cards[player] }}
       </p>
    </div>
</template>

<script>
import * as _ from 'lodash'
import * as firebase from 'firebase'
import { onGameChanged } from '../game-service'
import store from '../store'

export default {
    name: 'Cards',
    beforeRouteEnter (to, from, next) {
        const nextOnce = _.once(next);
        onGameChanged(to.params.id, state => {
            store.commit('setGameState', state);
            nextOnce();
        })
       
  },
    computed: {
        store () {
            return this.$store
        },
        state () {
            return this.store.state
        },
        player () {
            return this.state.name;
        },
        room () {
            return this.state.room;
        },
        gameState () {
            return this.state.gameState;
        }
    },
    created () {
        const player = this.state.name;

        console.log(this.gameState.cards[player]);
    },
    methods: {
    },
    data () {
        return {}
    }
}
</script>

<style scoped lang="scss">

</style>
