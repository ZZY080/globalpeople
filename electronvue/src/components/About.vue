<template>
    <div width="100%" height="100%">
        <div> {{ $route.params }}</div>
        <el-empty>
            <el-button type="primary">Button</el-button>
        </el-empty>

    </div>
</template>
<script>
export default {
    // name:"Demo",
    data() {
        console.log("--------------------");
        console.log("data")
        return {
            msg: "About",
        }
    },
    setup() {

    },
    beforeCreate() {
        console.log("beforeCreate");
    },
    created() {
        this.$watch(
            () => this.$route.params,
            (toParams, previousParams) => {
                console.log(toParams)
            }
        )
        console.log("created");
    },
    async beforeRouteUpdate(to, from) {
        console.log(to, from)
    }
    ,
    beforeMount() {
        console.log("beforeMount");
    },
    mounted() {
        console.log("mounted")
    }
}
</script>

<style scoped></style>