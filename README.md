使用Node.js+Express4.x++mongodb3.x+WebStorm10.x开发的microblog微博
=========

项目结构：
bin
    www     项目启动文件  相当于  npm start启动(就是调用这个www文件)
models
            --- mongodb对应的的集合操作(类似J2EE中的DAO层)
node_modules
            --- 依赖的第三方模块
public
            --- image、css、js等静态文件
routes
    index.js   ---   入口请求路由处理模块
    users.js   ---   用户相关请求url路由处理模块

views
            --- 存放ejs或jade视图


程序启动：
        1.先启动mongodb
                        ./mongod --dbpath=/home/develop/mongodb/db --smallfiles
          启动mongo客户端，创建数据库microblog
                        ./mongo
                        use microblog
        2.修改setting.js文件
                        module.exports = {
                           coolieSecret : 'microblogZJH',
	                   db:'microblog',
                      	   host:'localhost'
                           //host:'192.168.1.246'
                           };
        3.启动程序
                        npm start
        4.关闭mongodb
                    在mongodb客户端执行
                        use admin
                        db.shutdownServer();
        5.访问：IP:3000



异常处理：

1.Mongodb启动报错：内存过小   Please make at least 3379MB available in /mongodb/data/m1/journal or use --smallfiles
  解决：
       启动时添加参数 --smallfiles
       ./mongod --dbpath=/home/develop/mongodb/db --smallfiles

2.程序启动报错：Error: Error setting TTL index on collection : sessions
  原因：mongo连接的版本过低，更新版本或使用"mongoose": "4.1.3",
  解决：
       修改package.json的mongodb和connect-mongo参数
              "mongodb": "^2.0.45",
              "connect-mongo":"0.8.2",
              











