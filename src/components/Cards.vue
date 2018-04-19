<template>
    <div>
        <ul class="cards">
            <li :key="card" v-for="card in sorterdCards" @click="onCardClick(card)">
                <card :card="card"></card>
            </li>
        </ul>
        <p>
            {{sorterdCards.join(' ')}}
        </p>
    </div>
</template>

<script>
import * as _ from 'lodash'
import * as gameService from '../game-service'
import { Phase } from '1k'
import { sortCards } from '../helpers'

export default {
    name: 'Cards',
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
        isSharingStockPhase () {
            return this.gameState.phase === Phase.SHARE_STOCK
        },
        isTrickInProgressPhase () {
            return this.gameState.phase === Phase.TRICK_IN_PROGRESS
        },
        gameState () {
            return this.state.gameState
        },
        player () {
            return this.state.name
        },
        cards () {
            return this.gameState.cards[this.player] || []
        },
        sorterdCards () {
            return sortCards(this.cards)
        },
        opponents () {
            if (!this.gameState.players) return
            return _.chain(this.gameState.players)
                .map('id')
                .filter(player => player !== this.player)
                .value()
        }
    },
    created () {},
    methods: {
        onCardClick (card) {
            let action

            if (this.isSharingStockPhase) {
                const opponent = _.chain(this.opponents)
                    .map(name => ({
                        name: name,
                        totalCards: this.gameState.cards[name].length
                    }))
                    .filter(opponent => opponent.totalCards === 7)
                    .map('name')
                    .first()
                    .value()

                action = {
                    type: 'shareStock',
                    args: [this.player, card, opponent]
                }
            }

            if (this.isTrickInProgressPhase) {
                action = {
                    type: 'throwCard',
                    args: [card, this.player]
                }
            }

            if (!action) return

            console.log(action)
            gameService.performAction(this.room.name, action)
        }
    },
    data () {
        return {}
    }
}
</script>

<style scoped lang="scss">
.cards {
    padding: 0;
    margin: 0;
    overflow-x: scroll;
    list-style: none;
    display: flex;
}
</style>
