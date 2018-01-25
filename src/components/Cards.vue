<template>
    <div>
       <p>
           <strong>{{state.name}}</strong> 
           cards of  
           <strong>{{ $route.params.id }}</strong> 
           table displayed here
       </p>
    </div>
</template>

<script>
// import * as _ from 'lodash'
import * as firebase from 'firebase'

export default {
    name: 'Cards',
    beforeRouteEnter (to, from, next) {
        setTimeout(() => {
            next();
        }, 1000);
  },
    computed: {
        store () {
            return this.$store
        },
        state () {
            return this.store.state
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

</style>
