// 导入 router controllers
import express from "express";
import { register, normallogin} from "../controllers/UserController.js";


const UserRouter = express.Router();



// 用户注册
UserRouter.post("/register", register);

// 用户登录
UserRouter.post("/normal/login", normallogin); // 普通登录


// 导出路由
export default UserRouter;
