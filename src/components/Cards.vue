<template>
    <div>
        <ul class="cards">
            <li  :key="card" v-for="card in gameState.cards[player]">
                <div class="cards__card">
                    {{ card }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import * as _ from 'lodash'

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
        gameState () {
            return this.state.gameState
        },
        player () {
            return this.state.name
        }
    },
    created () {},
    methods: {

    },
    data () {
        return {}
    }
}
</script>

<style scoped lang="scss">
$cardWidth: 27vw;
$cardHeight: $cardWidth * 1.65;

.cards {
    padding: 0;
    margin: 0;
    overflow-x: scroll;
    list-style: none;
    display: flex;
}

.cards__card {
    color: #fff;
    font-size: 10vw;
    width: $cardWidth;
    height: $cardHeight;
    background: #ccc;
    margin: 1px;

    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
