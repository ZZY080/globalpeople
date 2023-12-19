<template>
    <div>
        {{ msg }}--{{ $route.params.id }}
    </div>
</template>
<script>
export default {
    // name:"Demo",
    data() {
        return {
            msg: "User",
        }
    }
}
</script>

<style scoped>


</style>