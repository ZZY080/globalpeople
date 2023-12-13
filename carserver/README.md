# 命名规则  

1. models  文件夹里首字母以大写字母开始
2. 文件命名采用大驼峰命名
3. configs 文件夹中 config.js 中所有变量名用大写 多个单词之间用下划线连接
4. utils   文件夹中 util.js   中所有函数采用小驼峰命名法



# 导入导出规则使用 ES6语法
1. 导入自己模块时加后缀.js 且导入后都加上;
2. 无论导入导出结尾都加上;
3. 如果只导出一个就用法 export default 导出多个用 export
4. 整体项目采用ES6 模块进行导入导出 


# 使用的第三方库
1. mongosee
2. cors 
3. body-parser

# 数据库设计时 id 通常为 表名前缀_id


# 文件夹介绍
server
    --bin
      用于存储二进制文件
    
    --configs
      用于 数据库连接的参数 以及 生成token加密参数的 配置 方便后期维护  主要用于存常量且 常量都是大写
    --utils
      工具文件夹常用功能的编写方便后期维护 主要用于存通用函数 函数命名采用小驼峰命名


    --node_modules
      npm库文件夹


    --public
      存放公共资源
    
    --src
      --controllers
        存放路由处理函数
      --dbs
        存放数据库连接对象
      --middlewares
        存放常用的中间件
      --models
        数据库模型
      --routes
        路由
      --views
        存放html

#### 一  主题色搭配

 激活色  409EFF
 普通色  d4d4d4

