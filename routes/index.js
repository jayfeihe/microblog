var express = require('express');
var router = express.Router();
//var User = require('../models/user')

var UserService = require('../service/user-service');
var user_service = new UserService();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: '首页' ,
        user:'',
        success:'',
        error:'',
        posts:[]});
});

//用户注册url
router.get('/reg',function(req,res){
    //返回用户注册界面
    res.render('reg',{title:'用户注册',
        user:'',
        success:'',
        error:''});
});

//处理用户注册
router.post('/reg',function(req,res){
    user_service.save(req,res);
})

//用户登录url
router.get('/login',function(req, res){
    res.render('login',{title:'用户注册',
        user:'',
        success:'',
        error:''});
})

//处理用户登录
router.post('/login',function(req, res){
    user_service.login(req, res);
});


//发布微博的页面url
router.get('/publish',function(req, res){
    res.render('publish',{title:'用户注册',
        user:'',
        success:'',
        error:''});;
});

//处理发布微博
router.get('/publish',function(req, res){

});

module.exports = router;
