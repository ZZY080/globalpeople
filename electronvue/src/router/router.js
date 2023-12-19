import {createRouter,createWebHashHistory,createWebHistory} from "vue-router"
import Login from "../components/Login.vue"
import Home from "../components/Home.vue"
import About from "../components/About.vue"
// import NotFound from "../components/NotFound.vue"


const routes = [
    {path:"/",redirect:"/login",},
    {path:"/login",component:Login,meta:{title:"登录注册页"}},
    {path:"/home",component:Home,meta:{title:"主页"},children:[
        {
            path:"s/:id/1",
            component:About,
        },
    ]},
    
]

const router = createRouter({
    history:createWebHistory(),
    routes,
})

router.beforeEach(async(to,from,next)=>{
    let token = window.localStorage.getItem("token");
    if(to.meta.title){
        document.title=to.meta.title
    }
    if(!token && to.path=="/login"){
       return next();
    }
    if(!token && to.path!="/login"){
        return next("/login");
     }
    if(token && to.path=="/login"){
       return next("/home");
    }
    if(token&&to.path!="/login"){
        return next();
    }
})

export default router