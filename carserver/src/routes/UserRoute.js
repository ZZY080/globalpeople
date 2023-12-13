// // 导入 router controllers
import express from "express";
import { register, normallogin, qqlogin, wechatlogin, remove, authenticate, search, wechatslogin, decryptphone } from "../controllers/UserController.js";


const UserRouter = express.Router();



// 用户注册
UserRouter.post("/register", register);

// 用户登录
UserRouter.post("/normal/login", normallogin); // 普通登录
UserRouter.post("/qq/login", qqlogin); // qq登录
UserRouter.post("/wechat/login", wechatlogin); // 微信登录
UserRouter.post("/wechats/login", wechatslogin); // 微信手机号授权登录
UserRouter.post("/wechats/decryptphone", decryptphone); // 处理微信手机号解密


// 用户注销
UserRouter.delete("/remove", remove);

// 用户认证
UserRouter.post("/authenticate", authenticate);

// 用户查询
UserRouter.get("/search", search);


// 导出路由
export default UserRouter;
