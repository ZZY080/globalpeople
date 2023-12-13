// 引入mongodb
import mongoose from "../dbs/mongodb.js";
import {getCurrentDate} from "../../utils/util.js";
// 建立土地租用记录表
const UserRentSoilSchema = new mongoose.Schema({
    // 租用记录id
    urs_id: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function (likeId) {
                const count = await this.model('UserCollectSoil').countDocuments({ like_id: likeId });
                return count === 0;
            },
            message: 'collect_id must be unique'
        },
        default: () => {
            return (new mongoose.Types.ObjectId()) + "";
        }
    },
    // 租用者id 外键
    user_id: {
        type: String,
    },
    // 租用的土地id 外键
    soil_id: {
        type: String,
    },
    urs_start_date: {
        type: String,
    },
    urs_end_date: {
        type: String,
    },
    urs_price:{
        type:String,
    },
    urs_paymethod:{
        type:String,
    },
    urs_status: {
        type: String,
        // 0 未租用 1 租用中 2 已结束
        enum: ["0", "1", "2"],
        default:"0",
    },
    create_time: {
        type: String,
        default: getCurrentDate(),
    },
    update_time: {
        type: String,
        default: getCurrentDate(),
    }
});

// 建立土地租用记录数据库模型
const UserRentSoilModel = mongoose.model("UserRentSoil", UserRentSoilSchema, "userrentsoil");
export default UserRentSoilModel;

