// 引入mongodb
import mongoose from "../dbs/mongodb.js";
import {getCurrentDate} from "../../utils/util.js";

// 建立土地表
const SoilSchema = new mongoose.Schema({
    soil_id: {
        type: String,
        unique: true,
        required: true,
        default: () => {
            return (new mongoose.Types.ObjectId()) + "";
        }
    },
    soil_pic: {
        type: Array,
        required: true,
    },

    soil_area: {
        type: String,
        required: true,
    },
    soil_location: {
        type: String,
        required: true,
    },
    soil_price: {
        type: String,
        required: true,
    },
    soil_active:{
        type:Array,
    },
   
    // 三种状态 0 未租用 1 已租用 2 土地处理中
    soil_status: {
        type: String,
        enum: ["0", "1", "2"],
        default: "0",
        required: true,
    },
    // 相当于外键 表示土地主人
    user_id: {
        type: String,
        required: true
    },
    
    create_time: {
        type: String,
        default: getCurrentDate(),
    },
    update_time: {
        type: String,
        default: getCurrentDate(),
    }
})
// 建立土地数据库模型
const SoilModel = mongoose.model("Soil", SoilSchema, "soil");
export default SoilModel;