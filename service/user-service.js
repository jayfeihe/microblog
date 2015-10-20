/**
 * User的Service逻辑层代码
 * Created by Jay He on 2015/10/19.
 */
//md5加密需要的模块
var crypto = require('crypto');

var User = require('../models/user');

function UserService(){
    //用户注册--添加User
    this.save = function(req,res){
        //1.校验用户两次输入口令是否一致
        if(req.body.password !=req.body['password-repeat']){
            console.log('两次输入的密码口令不一致！');
            //req.session('error','两次输入的密码口令不一致！');
            return res.render('reg',{title:'用户注册',
                user:'',
                success:'',
                error:'两次输入的密码口令不一致！'});
        }else {
            console.log("开始校验");
            //2.生成口令密码的md5散列值
            var md5 = crypto.createHash('md5');
            var password = md5.update(req.body.password).digest('base64');
            console.log("生成密码");
            //3.检测用户名是否已存在
            User.findByUsername(req.body.username, function (err,user) {
                if(err){
                    console.log(err);
                }else{
                    if(user!='') {
                        console.log("该用户名已被占用！");
                        return  res.render('reg',{title:'用户注册',
                            user:'',
                            success:'',
                            error:'该用户名已被占用！'});
                    }else{
                        //4.根据处理结果返回给信息
                        var newUser = new User({
                            username:req.body.username,
                            password:password
                        });
                        newUser.save(function(err){
                            if(err){
                                console.log("注册失败！ "+err);
                            }else{
                                console.log("注册成功！");
                                return res.redirect('/');
                            }
                        })

                    }
                }
            });

        }
    }


    //用户登录
    this.login = function(req, res){
        //1.生成md5密码
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('base64');
        //2.登录
        User.login(req.body.username,password,function(err,user){
            if(user!=''){
                console.log('登录成功！');
                res.render('index',{ title: '首页' ,
                    user:'',
                    success:'登录成功',
                    error:'',
                    posts:[]});
            }else{
                console.log('登录失败！');
                res.render('login',{ title: '用户登录' ,
                    user:'',
                    success:'',
                    error:'用户名或密码错误，请重试'});
            }
        });
    }


}

module.exports=UserService;
