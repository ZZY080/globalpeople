<template>
    <div class="wrapper">
        <div class="main">
            <h1 class="title">欢迎{{ isLogin?"登录":"注册" }}</h1>
            <p class="desc">加入我们,开始使用各种有趣的应用吧!</p>
            <input type="text" class="username" v-model="username" placeholder="请输入用户名" autocomplete="off">
            <input type="text" class="password" v-model="password" placeholder="请输入密码" autocomplete="off">
            <div class="btns">
                <div class="item" @click="handleOperation">{{ isLogin?"登录":"注册" }}</div>
            </div>
            <p class="btnsdesc" @click="handleMethod">{{ isLogin?"没有账号?立即注册":"已有账号?立即登录" }}</p>
        </div>
    </div>
</template>
<script>
export default {
    // name:"Demo",
    data() {
        return {
            isLogin:true,
            username:"",
            password:""
        }
    },
    mounted(){
       
    },
    methods:{
        handleMethod(){
            this.isLogin=!this.isLogin;
        },
        handleOperation(){
            if(this.isLogin==true){
                if(this.username=="202003021003"){
                    if(this.password=="ZZY806@!."){
                        window.localStorage.setItem("token","1234354543543")
                        this.$router.push({path:"/home"})
                    }
                }
            }else {

            }
        }
    }
}
</script>

<style scoped>
    .wrapper {
        box-sizing: border-box;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .main {
        background-color: black;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        padding: 70px 90px;
    }
    .main .title {
        color: #ffffff;

    }
    .main .desc {
        margin-top: 10px;
        color: #ffffff;
    }
    .main .username {
        margin-top: 30px;
        width: 100%;
        height: 40px;
        outline: none;
        border: none;
        border-radius: 10px;
        background-color: #2a2a2a;
        color: white;
        padding-left: 20px;
    }
    .main .password {
        margin-top: 10px;
        width: 100%;
        height: 40px;
        outline: none;
        border: none;
        border-radius: 10px;
        background-color: #2a2a2a;
        color: white;
        padding-left: 20px;


    }
    .main .btns {
        margin-top: 20px;
        display: flex;
        color: white;
        width: 100%;

    }
    .main .btns .item {
        user-select: none;
        cursor: pointer;
        border: 1px solid white;
        border-radius: 10px;
        width: 100%;
        text-align: center;
    }
    .main .btns .item:active{
        opacity: 0.3;
    }
    .main .btnsdesc{
        cursor: pointer;
        user-select: none;
        margin-top: 20px;
        color: white;
    }
</style>