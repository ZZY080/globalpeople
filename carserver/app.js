import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
// 解析token
import { expressjwt } from "express-jwt";

import { JWT_SECRET_KEY, SERVER_PORT, IP } from "./configs/config.js";
import UserRoute from "./src/routes/UserRoute.js";
import CarRoute from "./src/routes/CarRoute.js";



const app = express();

// 暴露静态文件夹
app.use("/assets/images",express.static("./assets/images"))

// 全局中间件挂载
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// app.use(
//     expressjwt({
//         // 加密时设置的秘钥
//         secret: JWT_SECRET_KEY,
//         // 设置算法
//         algorithms: ["HS256"],
//         // 无token请求不进行解析，并且抛出异常
//         // credentialsRequired:false,

//     })
//     .unless({
//         path:[
//             "/api/user/register",
//             "/api/user/login",
//         ]
//     })
// )


// 用户路由
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/cars",CarRoute);



// 错误中间件 当token失效时 返回信息
// app.use((err, req, res, next) => {
//     if (err.name === "UnauthorizedError") {
//         res.status(401).send({
//             status: 1,
//             data: {},
//             message: "认证失败!"
//         })
//     }
// })



// 监听3000端口
app.listen(SERVER_PORT, IP, () => {
    console.log(`server is running at http://${IP}:${SERVER_PORT}`)
})


