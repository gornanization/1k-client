<template>
    <div>
        <v-ons-dialog cancelable :visible.sync="increaseBidPanelVisible">
            <div style="padding: 2%">
                <v-ons-range v-model="bid.value"
                    min="100" max="320" step="10" style="width: 100%;">
                </v-ons-range>
                
                <v-ons-button @click="onBidSelected()" modifier="large"> Bid {{ bid.value }} </v-ons-button>
            </div>
        </v-ons-dialog>

        <v-ons-action-sheet cancelable :visible.sync="optionsVisible" title="Options:">
            <v-ons-action-sheet-button @click="onIncreaseBidSelected()">Increase Bid</v-ons-action-sheet-button>
            <v-ons-action-sheet-button @click="hide()">Close</v-ons-action-sheet-button>
        </v-ons-action-sheet>

         <v-ons-fab position="bottom right" @click="show()" >
            <v-ons-icon icon="md-settings"></v-ons-icon>
        </v-ons-fab>
    </div>
</template>

<script>
import * as _ from 'lodash'
import { Phase, getNextBiddingTurn, getNextTurn } from '../../../1k/dist/src/index'
import * as gameService from '../game-service'

export default {
    name: 'Options',
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
        }
    },
    methods: {
        hide () {
            this.optionsVisible = false
        },
        show () {
            this.optionsVisible = true
        },
        onBidSelected() {
            this.sendIncreaseBidAction();
            this.hideIncreaseBidPanel();
        },
        showIncreaseBidPanel () {
            this.increaseBidPanelVisible = true
        },
        hideIncreaseBidPanel () {
            this.increaseBidPanelVisible = false
        },
        onIncreaseBidSelected () {
            this.showIncreaseBidPanel();
            this.hide();
        },
        sendIncreaseBidAction() {
            gameService.performAction(this.room.name, {
                type: 'increaseBid', 
                args: [this.player, +this.bid.value]
            });
        }
    },
    data () {
        return {
            bid: {
                value: 100
            },
            increaseBidPanelVisible: false,
            optionsVisible: false
        }
    }
}
</script>

<style scoped lang="scss">
</style>
