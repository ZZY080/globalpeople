// 导入 SoilModel model
import mongoose from "../dbs/mongodb.js";
import SoilModel from "../models/SoilModel.js";
import UserLikeSoilModel from "../models/UserLikeSoilModel.js";

import UserCollectSoilModel from "../models/UserCollectSoilModel.js";
import UserRentSoilModel from "../models/UserRentSoilModel.js";

// 用户添加新土地
export let addsoil = async (req, res, next) => {
    const { soil_area, soil_pic, soil_location, soil_price, user_id, soil_active } = req.body;
    try {
        await SoilModel.create({
            soil_pic: soil_pic,
            soil_area: soil_area,
            soil_location: soil_location,
            soil_price: soil_price,
            user_id: user_id,
            soil_active: soil_active,
        })
        res.send({
            status: 200,
            data: [],
            msg: "添加土地成功",
        })
    } catch (e) {
        if (e && e instanceof mongoose.Error && e.code === 11000) {
            return res.send({
                status: 400,
                data: [],
                msg: "添加土地失败,不符合唯一性约束"
            })
        } else if (e) {
            res.send({
                status: 400,
                data: [],
                msg: "添加土地失败,请查找原因"
            });

        }
    }
}
// 获取所有土地列表
export let getsoil = async (req, res, next) => {
    const { user_id, page: pageNum } = req.query;
    const pageSize = 15;
    try {
        let soillist = await (SoilModel.find().limit(15).skip((pageNum - 1) * pageSize));
        let newsoillist = await Promise.all(soillist.map(async (item, index) => {
            const likenum = (await UserLikeSoilModel.find({ soil_id: item.soil_id, soil_islike: true })).length;
            const like = (await UserLikeSoilModel.find({ soil_id: item.soil_id, user_id: user_id, soil_islike: true }));
            let soil_islike = false;
            if (like.length > 0) {
                soil_islike = true;
            }
            return {
                soil_id: item.soil_id,
                cover: item.soil_pic[0],
                soil_islike: soil_islike,
                soil_likenum: likenum
            }
        }))
        res.send({
            status: 200,
            data: newsoillist,
            msg: "获取土地列表数据成功"
        })
    } catch (e) {
        res.send({
            status: 400,
            data: [],
            msg: "获取土地列表数据失败"
        })
    }
}
// 获取土地详情页
export let getsoildetail = async (req, res, next) => {
    let { user_id, soil_id } = req.params;
    let soil = await SoilModel.find({ soil_id: soil_id });
    let collect = await UserCollectSoilModel.find({ user_id: user_id, soil_id: soil_id });
    let like = await UserLikeSoilModel.find({ user_id: user_id, soil_id: soil_id });
    if (collect.length == 0) {
        await UserCollectSoilModel.create({
            user_id: user_id,
            soil_id: soil_id
        })
    }
    if (like.length == 0) {
        await UserLikeSoilModel.create({
            user_id: user_id,
            soil_id: soil_id,
        })
    }
    collect = await UserCollectSoilModel.find({ user_id: user_id, soil_id: soil_id });
    like = await UserLikeSoilModel.find({
        user_id: user_id, soil_id: soil_id
    });
    res.send({
        status: 200,
        data: {
            soil_pic: soil[0].soil_pic,
            soil_iscollect: collect[0].soil_iscollect,
            soil_islike: like[0].soil_islike,
            soil_price: soil[0].soil_price,
            soil_area: soil[0].soil_area,
            soil_location: soil[0].soil_location,
            soil_active: soil[0].soil_active
        },
        msg: "获取土地详情页成功!"
    })
}
// 更新土地照片
export let addsoilpic = async (req, res, next) => {

}
// 用户删除土地

export let soilcollect = async (req, res, next) => {
    let { user_id, soil_id } = req.params;
    const collect = await UserCollectSoilModel.find({ user_id: user_id, soil_id: soil_id });
    const { soil_iscollect } = collect[0];
    await UserCollectSoilModel.updateOne({
        user_id: user_id,
        soil_id: soil_id
    }, {
        soil_iscollect: !soil_iscollect
    })
    res.send({
        status: 200,
        data: {
            soil_iscollect: !soil_iscollect,
        },
        msg: "收藏成功"
    })
}
// 用户修改土地 根据土地id用户id修改数据
export let soillike = async (req, res, next) => {
    let { user_id, soil_id } = req.params;
    const like = await UserLikeSoilModel.find({ user_id: user_id, soil_id: soil_id });
    const { soil_islike } = like[0];
    await UserLikeSoilModel.updateOne({
        user_id: user_id,
        soil_id: soil_id
    }, {
        soil_islike: !soil_islike
    })
    res.send({
        status: 200,
        data: {
            soil_islike: !soil_islike,
        },
        msg: "点赞成功"
    })

}
// 用户租用土地
export let soilrent = async (req, res, next) => {
    let { user_id, soil_id, urs_start_date, urs_end_date, urs_paymethod, urs_price, urs_status } = req.body;
    let rentsoil = await UserRentSoilModel.find({
        user_id: user_id,
        soil_id: soil_id,
    })
    if (rentsoil.length == 0) {
        await UserRentSoilModel.create({
            user_id,
            soil_id,
            urs_start_date,
            urs_end_date,
            urs_paymethod,
            urs_price,
            urs_status
        })
        res.send({
            status: 200,
            data: [],
            msg: "购买成功!",
        })
    }
    if (rentsoil.length > 0) {
        res.send({
            status: 400,
            data: [],
            msg: "此土地已被购买,请查询其它土地"
        })
    }
}
// 用户查找土地
