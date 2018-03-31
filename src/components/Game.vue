<template>
<div>
        <cards></cards>
        <bid></bid>
        <options></options>
</div>
</template>

<script>
import * as _ from 'lodash'
import { Phase, getNextBiddingTurn } from '../../../1k/dist/src/index'
import { onGameChanged } from '../game-service'
import store from '../store'

export default {
    name: 'Game',
    beforeRouteEnter (to, from, next) {
        const nextOnce = _.once(next)
        onGameChanged(to.params.id, state => {
            if(!state) return;
            if(!state.bid) return;
            store.commit('setGameState', state);
            nextOnce()
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
            return this.state.name
        },
        room () {
            return this.state.room
        },
        gameState () {
            return this.state.gameState
        }
    },
    created () {
        const player = this.state.name
        // console.log(this.gameState.cards[player])
    },
    watch: {
        gameState (gameState) {
            switch (gameState.phase) {
            case Phase.BIDDING_IN_PROGRESS: {
                console.log(gameState.phase)
            }
            }
        }
    },
    methods: {
        onBidCreated () {
            this.bidPopupVisible = false
        }
    },
    data () {
        return {
            bidPopupVisible: true
        }
    }
}
</script>

<style scoped lang="scss">

</style>
