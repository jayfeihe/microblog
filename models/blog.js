/**
 * 微博post的集合操作
 * Created by Jay He on 2015/10/20.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

//定义Post集合  -- 即 表结构
var BlogSchema = new Schema({

    //发布人
    user:{type:String},
    //内容
    content:{type:String},
    //图片
    pic:{type:String},
    //发布时间
    publishTime:{type:Date,default: Date.now()},
    //标记
    tag:{type:String},
});

//查询某个用户发布过的微博
BlogSchema.statics.findByUsername = function(username,callback){
    return this.model('blog').find({user:username},function(err,blog){
        if(err){
            console.error(err);
        }else{
            if(blog.length>0){
                console.log("查到了该用户的微博 数目： "+blog.length);
            }
            callback(err,blog);
        }
    })
}

//查询最新的20条微博
BlogSchema.statics.findTop = function(num,callback){
    return this.model('blog').find({}).sort({publishTime:-1}).limit(20);
}



module.exports = mongoose.model('blog',BlogSchema);