// 引入mongodb
import {getCurrentDate} from "../../utils/util.js";
import mongoose from "../dbs/mongodb.js";
// 建立土地点赞列表
const UserCollectSoilSchema = new mongoose.Schema({
    collect_id: {
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
    user_id: {
        type: String,
        required: true,
    },
    soil_id: {
        type: String,
        required: true,
    },
    // 是否点赞
    soil_iscollect: {
        type: Boolean,
        default: false,
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

// 建立土地点赞数据库模型
const UserCollectSoilModel = mongoose.model("UserCollectSoil", UserCollectSoilSchema, "usercollectsoil");
export default UserCollectSoilModel;