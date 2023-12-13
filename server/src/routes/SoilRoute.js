// 导入 router controllers
import express from "express";
import {addsoil,getsoil,soilcollect,soillike,getsoildetail,soilrent} from "../controllers/SoilController.js";

const SoilRouter = express.Router();

// 添加土地信息
SoilRouter.post("/addsoil",addsoil);
// 获取所有土地列表
SoilRouter.get("/getsoil",getsoil);
// 获取土地详情页轮播图接口
SoilRouter.get("/getsoildetail/:user_id/:soil_id",getsoildetail);
// 根据土地id 收藏 与 取消收藏
SoilRouter.put("/soilcollect/:user_id/:soil_id",soilcollect);
// 根据土地id 点赞 与 取消点赞
SoilRouter.put("/soillike/:user_id/:soil_id",soillike);
// 用户租用土地
SoilRouter.post("/soilrent",soilrent);


export default SoilRouter;