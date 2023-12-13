// 引入mongodb
import mongoose from "../dbs/mongodb.js";
import {getCurrentDate} from "../../utils/util.js";

// 建立土地点赞列表
const UserLikeSoilSchema = new mongoose.Schema({
    like_id: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function (likeId) {
                const count = await this.model('UserLikeSoil').countDocuments({ like_id: likeId });
                return count === 0;
            },
            message: 'like_id must be unique'
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
    soil_islike: {
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
const UserLikeSoilModel = mongoose.model("UserLikeSoil", UserLikeSoilSchema, "userlikesoil");
export default UserLikeSoilModel;