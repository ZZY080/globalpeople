// 引入mongodb
import mongoose from "../dbs/mongodb.js";
import { getCurrentDate } from "../../utils/util.js";
// 建立用户权限表
const UserRoleSchema = new mongoose.Schema({
    user_role_id: {
        type: String,
        required: true,
        unique: true,
    },
    // 外键
    user_id: {
        type: String,
    },
    // 权限 0 普通用户 1 农户 2  管理员
    user_role_status: {
        type: String,
        enum: ["0", "1", "2"],
        default: "0",
        required: true,
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

// 建立用户权限数据库模型
const UserRoleModel = mongoose.model("UserRole", UserRoleSchema, "userrole");
export default UserRoleModel;