<template>
    <div>
        {{ msg }}--{{ $route.params }}
    </div>
</template>
<script>
export default {
    // name:"Demo",
    data() {
        return {
            msg: "NotFound",
        }
    }
}
</script>

<style scoped>


</style>