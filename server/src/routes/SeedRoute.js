// 导入 router controllers
import express from "express";
import {addseed,getseed} from "../controllers/SeedController.js"

const SeedRouter = express.Router();

// 添加种子信息
SeedRouter.post("/addseed",addseed);
SeedRouter.post("/getseed",getseed);
export default SeedRouter;
