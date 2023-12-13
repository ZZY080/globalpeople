// 引入mongodb
import mongoose from "../dbs/mongodb.js";

// 建立用户表
const UserSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
        },
        username: {
            type: String,
        },
        password: {
            type: String,
        },
        create_time: {
            type: Date,
            default: Date.now(),
        },
        update_time: {
            type: Date,
            default: Date.now(),
        }
    })

// 建立用户数据库模型
const UserModel = mongoose.model("User", UserSchema, "users");
export default UserModel;

