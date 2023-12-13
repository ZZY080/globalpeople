// 引入mongodb
import mongoose from "../dbs/mongodb.js";
import {getCurrentDate} from "../../utils/util.js";
// 建立用户表
const UserSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
            unique: true,
            default:()=>{
                return (new mongoose.Types.ObjectId())+"";
            }
        },
        user_name: {
            type: String,
        },
        user_password: {
            type: String,
            required: true,
        },
        user_email: {
            type: String,
            required: true,
            unique: true,
        },
        user_phone: {
            type: String,
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

// 建立用户数据库模型
const UserModel = mongoose.model("User", UserSchema, "user");
export default UserModel;

