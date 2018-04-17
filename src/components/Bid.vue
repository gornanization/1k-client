<template>
    <div>
     <v-ons-action-sheet :visible="isBiddingInProgressPhase && isMyBiddingTurn" title="Bid:">
      <v-ons-action-sheet-button @click="onBidCreated(nextBidValue)"> {{ nextBidValue }}</v-ons-action-sheet-button>
      <v-ons-action-sheet-button @click="onBidCreated(null)">Pass</v-ons-action-sheet-button>
    </v-ons-action-sheet>
    </div>
</template>

<script>
import * as _ from 'lodash'
import { Phase, getNextTurn } from '1k'
import * as gameService from '../game-service'

export default {
    name: 'Bid',
    computed: {
        store () {
            return this.$store
        },
        state () {
            return this.store.state
        },
        room () {
            return this.state.room
        },
        gameState () {
            return this.state.gameState
        },
        player () {
            return this.state.name
        },
        isBiddingInProgressPhase () {
            return this.gameState.phase === Phase.BIDDING_IN_PROGRESS
        },
        lastBid () {
            if (!this.gameState || !this.gameState.bid || this.gameState.bid.length === 0) return

            return _.chain(this.gameState.bid)
                .first()
                .value()
        },
        lastValueableBid () {
            if (!this.gameState || !this.gameState.bid || this.gameState.bid.length === 0) return
            return _.chain(this.gameState.bid)
                .filter(['pass', false])
                .first()
                .value()
        },
        lastBidPlayer () {
            return this.lastBid && this.lastBid.player
        },
        currentBidPlayer () {
            if (!this.gameState.players || !this.lastBidPlayer) return
            return getNextTurn(this.gameState.players, this.lastBidPlayer)
        },
        isMyBiddingTurn () {
            return this.player === this.currentBidPlayer
        },
        lastBidValue () {
            if (!this.lastValueableBid) return
            return this.lastValueableBid.bid
        },
        nextBidValue () {
            if (!this.lastBidValue) return
            return this.lastBidValue + 10
        }
    },
    created () {
        console.log(this.gameState)
    },
    methods: {
        onBidCreated (nextBidValue) {
            const action = {
                type: nextBidValue ? 'bid' : 'pass',
                args: [this.player, nextBidValue]
            }
            gameService.performAction(this.room.name, action)
        }
    },
    data () {
        return {
        }
    }
}
</script>

<style scoped lang="scss">
</style>
