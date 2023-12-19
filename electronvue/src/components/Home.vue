<template>
    <div class="header-wrapper">
        <div class="header-main" :style="{ height: headerHeight + 'px' }">
            <!-- <div class="back" @click="handleBack">返回</div>
            <div class="forward" @click="handleForward">前进</div> -->
        </div>
    </div>
    <div class="content-wrapper">
        <div class="content-main" :style="{ height: contentHeight + 'px' }">
            <div class="slider">
                <div class="item">
                    <router-link to="/home/s/1/1">Go to Foo</router-link>
                </div>
                <div class="item">
                    <router-link to="/home/s/2/1">Go to Foo</router-link>
                </div>
                <div class="item">
                    <router-link to="/home/s/3/1">Go to Foo</router-link>
                </div>
            </div>
            <div class="right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        // console.log("data");
        return {
            windowHeight: 0,
            headerHeight: 60,
            contentHeight: 0,
        }
    },
    mounted() {
        // console.log("mounted");
        this.handleWindowHeight();
        window.addEventListener('resize', this.handleWindowHeight);
    },
    beforeDestroy() {
        console.log("beforeDestroy");
        window.removeEventListener('resize', this.handleWindowHeight);
    },
    methods: {
        handleBack(){
            this.$router.go(-1);
        },
        handleForward(){
            this.$router.go(1);
        },
        handleWindowHeight() {
            this.windowHeight = window.innerHeight;
        },
        handleContentHeight() {
            this.contentHeight = this.windowHeight - this.headerHeight;
        }
    },
    watch: {
        windowHeight() {
            this.handleContentHeight();
        }
    }

}
</script>

<style scoped>
.header-wrapper {
    background-color: red;
}

.header-main {}

.content-wrapper {
    background-color: gainsboro;
}

.content-main {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
}

.content-main .slider {
    width: 140px;
    height: 100%;
    background-color: yellow;
    overflow-y: auto;
}
.content-main .slider .item a{
    text-decoration: none;
}
.content-main .slider::-webkit-scrollbar {
    width: 2px;
    height: 2px;
}

.content-main .right {
    flex: 100;
    background-color: aquamarine;
}

</style>