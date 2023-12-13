// 加密模块
// import bcrypt from "bcrypt";
// 生成token
import jwt from "jsonwebtoken";
import request from "request";
// import crypto from "crypto";
// 导入 UserModel model
import UserModel from "../models/UserModel.js";
import { JWT_SECRET_KEY } from "../../configs/config.js"




// 注册
export let register = async (req, res, next) => {
    const { username, password, user_id } = req.body;
    console.log(username, user_id)
    // 1. 先在数据库查询是否含有此用户
    const userlength = (await UserModel.find({ username: username })).length;
    // 2. 如果用户存在则结束请求进行提示
    if (userlength > 0) {
        return res.send({
            code: 404,
            message: "此用户已存在,请更换其它用户名进行注册",
        })
    }
    try {
        const user = await UserModel.create({
            user_id: user_id,
            username: username,
            password: password,
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
    const user = await UserModel.findOne({
        _id: req.body.user_id,
    });
    res.send({
        code: 200,
        data: user,
    })
};

// qq登录
export let qqlogin = async (req, res, next) => {
    const user = await UserModel.findOne({
        _id: req.body.user_id,
    });
    res.send({
        code: 200,
        data: user,
    })
};
// 微信登录
export let wechatlogin = async (req, res, next) => {
    const user = await UserModel.findOne({
        _id: req.body.user_id,
    });
    res.send({
        code: 200,
        data: user,
    })
};

// 注销
export let remove = async (req, res, next) => {
    const user = await UserModel.findOne({
        _id: req.body.user_id,
    });
    res.send({
        code: 200,
        data: user,
    })
};

// 用户认证
export let authenticate = async (req, res, next) => {
    const user = await UserModel.findOne({
        _id: req.body.user_id,
    });
    res.send({
        code: 200,
        data: user,
    })
};

// 用户查询
export let search = async (req, res, next) => {
    const user = await UserModel.find();
    res.send({
        code: 200,
        data: user,
    })
};

// 微信手机号授权登录
export let wechatslogin = async (req, res, next) => {
    const code = req.body.code;
    // 向微信服务器发送请求，获取 session key 和 openid
    request({
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        method: 'GET',
        qs: {
            appid: 'wx3ecc886f69f58626',
            secret: 'eaf77ef143e08f2f2dad96c26dd02b32',
            js_code: code,
            grant_type: 'authorization_code',
        },
    }
        ,
        (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const data = JSON.parse(body);
                const sessionKey = data.session_key;
                const openid = data.openid;
                // 这里可以将 sessionKey 和 openid 存储在数据库中，用于后续的用户身份验证

                // 返回给小程序前端登录成功的响应
                res.json({ sessionKey, openid });
            } else {
                // 处理登录失败的情况
                res.status(500).json({ error: '登录失败' });
            }
        });
};

// 处理手机号解密
function decryptData(encryptedData, sessionKey, iv) {
    const sessionKeyBuffer = Buffer.from(sessionKey, 'base64');
    const encryptedDataBuffer = Buffer.from(encryptedData, 'base64');
    const ivBuffer = Buffer.from(iv, 'base64');

    const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKeyBuffer, ivBuffer);
    let decryptedData = decipher.update(encryptedDataBuffer, null, 'utf8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
};

export let decryptphone = async (req, res, next) => {
    const { encryptedData, sessionKey, iv } = req.body;
    try {
        const phoneNumber = decryptData(encryptedData, sessionKey, iv);
        console.log(phoneNumber);
        // 在这里可以将解密后的手机号返回给前端或进行其他业务逻辑处理
        res.json({ phoneNumber });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '解密失败' });
    }
};

