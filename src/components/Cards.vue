<template>
    <div class="cards" :class="getTotalCards()">
       <!-- <p>
           <strong>{{state.name}}</strong> 
           cards of  
           <strong>{{ $route.params.id }}</strong> 
           table displayed here
       </p> -->
           <div :key="card" v-for="card in cards" class="cards__card">
               <span>{{card}}</span>
           </div>
    </div>
</template>

<script>
// import * as _ from 'lodash'
import store from '../store'
import * as firebase from 'firebase'

export default {
    name: 'Cards',
    beforeRouteEnter(to, from, next) {
        const roomName = to.params.id

        const handler = store.subscribe(({ type }) => {
            if (type === 'setRooms') {
                handler()
                next(vm => vm.init())
            }
        })
    },
    computed: {
        cards() {
            const {gameState} = this.state
            return gameState.cards ? gameState.cards[this.state.name] : []
        },
        store() {
            return this.$store
        },
        state() {
            return this.store.state
        }
    },
    created() {},
    methods: {
        getTotalCards() {
            return `cards--${this.cards.length}`
        },
        init() {
            console.log('init', store.state.rooms)
        }
    },
    data() {
        return {}
    }
}
</script>

<style scoped lang="scss">
$cardWidth: 40vw;
$cardHeight: $cardWidth * 1.33;
$cardMarginWidth: 1vw;
$marginTop: 0;
$totalCardWidth: $cardWidth + (2 * $cardMarginWidth);

@for $i from 1 through 10 {
    .cards--#{$i} {
        width: $i * $totalCardWidth
    }
}

.cards {
    display: flex;
}

.cards__card {
    position: relative;
    border-radius: 3vw;
    top: 50%;
    min-width: $cardWidth;
    max-width: $cardWidth;
    margin: $marginTop $cardMarginWidth 0 $cardMarginWidth;
    height: $cardHeight;
    background: #ccc;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30vw;
}
</style>
