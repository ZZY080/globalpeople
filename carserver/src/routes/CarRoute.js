import express from "express";
import {gettpms,posttpms,srcs} from "../controllers/CarController.js"
const CarRouter = express.Router();

// 引擎管理系统
// CarRouter.post("/ems");

/*
    刹车控制系统  
    1  ABS 防抱死系统   
    2  EBD 电子制动力分配系统  
    3  EBA 紧急制动辅助系统 以确保制动性能和安全
*/

// 1. ABS 防抱死系统  Anti-lock Braking System
// CarRouter.post("/abs");

// 2. EBD 电子制动力分配系统 Electronic Brake force Distribution System
// CarRouter.post("/ebds");

// 3. EBA 紧急制动辅助系统 emergency brake assist system
// CarRouter.post("/ebas");

// 4. 车辆稳定性控制系统 vehicle stabilization control system
// CarRouter.post("/vscs");

// 5. 车辆动力转向系统 vehicle Power Steering System
// CarRouter.post("/vpss");

// 6. 空调和暖风控制系统 Air conditioning and heating control system
// CarRouter.post("/achcs");

// 7. 安全气囊控制系统 SRS supplementary restraint control system
CarRouter.post("/srcs",srcs);

// 8. 巡航控制系统 巡航控制系统 cruise control system
// CarRouter.post("/ccs");

// 9. 娱乐信息控制系统 Entertainment  information  control system
// CarRouter.post("eics");

// 10. 轮胎压力检测系统  Tire Pressure Monitor System

// 获取轮胎数据 [0,0,0,0]  分别为 左前轮 右边前轮 左后轮 右后轮
CarRouter.get("/tpms/:carId/tires",gettpms);
CarRouter.post("/tpms/:carId/tires",posttpms);

// 导出路由
export default  CarRouter;
