// 加密模块
import bcrypt from "bcrypt";
// 生成token
import jwt from "jsonwebtoken";
import request from "request";
import crypto from "crypto";
// 导入 UserModel model
import UserModel from "../models/UserModel.js";
import { JWT_SECRET_KEY } from "../../configs/config.js"

// 注册
export let register = async (req, res, next) => {
    const { user_email, user_password} = req.body;
    console.log(user_email, user_password);
    // 1. 先在数据库查询是否含有此用户
    const userlength = (await UserModel.find({ user_email: user_email })).length;
    // 2. 如果用户存在则结束请求进行提示
    if (userlength > 0) {
        return res.send({
            status: 404,
            data:[],
            msg: "此用户已存在,请更换其它用户名进行注册",
        })
    }
    try {
        const user = await UserModel.create({
            user_email: user_email,
            user_password: user_password,
        });
        console.log(user)
    } catch (error) {
        return res.send({
            code: 400,
            message: "用户id或者用户名已存在"
        })
    }
    res.send({
        code: 200,
        message: "恭喜你创建账号成功！"
    });
};

// 普通登录
export let normallogin = async (req, res, next) => {
    let {user_email,user_password} =req.body;
    if(user_email==undefined){
        return res.send({
            status:400,
            data:[],
            msg:"缺少邮箱字段"
        })
    }
    if(user_email==""){
        return res.send({
            status:400,
            data:[],
            msg:"邮箱不能为空"
        })
    }
    if(user_password==undefined){
        return res.send({
            status:400,
            data:[],
            msg:"缺少密码字段"
        })
    }
    if(user_password==""){
        return res.send({
            status:400,
            data:[],
            msg:"密码不能为空"
        })
    }
    
    const user = await UserModel.find({
        user_email:user_email,
    });
    if(user.length==0){
        return res.send({
            status:400,
            data:[],
            msg:"此用户不存在,请先注册用户"
        })
    }
    if(user_password!=user[0].user_password){
        return res.send({
            status:400,
            data:[],
            msg:"密码输入错误"
        })
    }
    res.send({
        status: 200,
        data: user,
        msg:"登录成功"
    })
};



