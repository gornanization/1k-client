<template>
    <div class="cards__card">
       <span class="cards__card__rank">{{ rank }}</span>
       <span v-bind:class="['cards__card__suit--' + getSuitNameBySuit(suit)]" class="cards__card__suit">{{ suit }}</span>
    </div>
</template>

<script>
import { toCard } from '1k'

const rankToNameMap = {
    '♥': 'heart',
    '♦': 'diamond',
    '♣': 'club',
    '♠': 'spade'
}

export default {
    name: 'Card',
    props: ['card'],
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
        rank () {
            return toCard(this.card).rank
        },
        suit () {
            return toCard(this.card).suit
        }
    },
    methods: {
        getSuitNameBySuit (suit) {
            return rankToNameMap[suit]
        }
    }
}
</script>

<style scoped lang="scss">

$cardWidth: 27vw;
$cardHeight: $cardWidth * 1.65;

.cards__card__suit {
    &--club, &--spade {
        color: black;
    }
    &--heart, &--diamond {
        color: red;
    }
}

.cards__card {
    border-radius: 1vw;
    border: 1px solid #ccc;
    font-size: 10vw;
    width: $cardWidth;
    height: $cardHeight;
    margin: 0.5vw;
    background: #fff;

    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
