/**
 * User集合的操作
 * Created by Jay He on 2015/10/19.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

//定义User集合  -- 即 表结构
var UserSchema = new Schema({

    //登录名
    username:{type:String, index:{unique:true}},
    //登录密码
    password:{type:String},
    //真实姓名
    name:{type:String},
    //QQ
    qq:{type:String},
    //email
    email:{type:String},
    //电话
    tel:{type:String},
    //年龄
    age:{type:Number},
    //注册时间
    regTime:{type:Date,default: Date.now()}
});

//定义根据用户名查找的方法,如果user=='',表示此名称已存在
UserSchema.statics.findByUsername = function(username,callback){
    return this.model('User').find({username:username},function(err,user){
            if(user.length!=0){
                console.log('查找到了用户： ' + user[0].username+" : "+user);
            }
            callback(err,user);
        }
      );
}


//登录
UserSchema.statics.login = function(username,password,callback){
    return this.model('User').find({username:username,password:password},function(err,user){
        if(user.length!=0){
            console.log('该用户可登录： ' + user[0].username+" : "+user);
        }
        callback(err,user);
    });
}

//导出接口，供其他模块调用
module.exports = mongoose.model('User',UserSchema);