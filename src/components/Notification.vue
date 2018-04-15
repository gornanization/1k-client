<template>
    <section class="infobox">
      {{state.name}}
    </section>
</template>

<script>
export default {
    name: 'Notification',
    computed: {
        store () {
            return this.$store
        },
        state () {
            return this.store.state
        }
    }
}
</script>

<style scoped lang="scss">
$fontSize: 6vw;
.infobox {
    position: relative;
    top: 0;
    height: $fontSize;
    line-height: $fontSize;
    font-size: $fontSize;
    padding: 1vw 0;
    width: 100%;
}
</style>
