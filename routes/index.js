var express = require('express');
var router = express.Router();

var UserService = require('../service/user-service');
    BlogService = require('../service/blog-service');

var user_service = new UserService();
var blog_service = new BlogService();


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.session.user+"9999999999999");
    res.render('index', { title: '首页' ,
        user:req.session.user,
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
router.get('/login',checkNotLogin);
router.get('/login',function(req, res){
    res.render('login',{title:'用户注册',
        user:'',
        success:'',
        error:''});
})

//处理用户登录
router.post('/login',checkNotLogin);
router.post('/login',function(req, res){
    user_service.login(req, res);
});


//发布微博的页面url
router.get('/publish', checkLogin);
router.get('/publish',function(req, res){
    res.render('publish',{title:'用户注册',
        user:req.session.user,
        success:'',
        error:''});;
});

//处理发布微博
router.post('/publish', checkLogin);
router.post('/publish',function(req, res){
    blog_service.publish(req,res);
});

//查看自己发布的微博
router.get("/logout",checkLogin);
router.get('/blog/own',function(req,res){
    blog_service.getBlogOwn(req,res);
});


//退出系统
router.get("/logout",checkLogin);
router.get('/logout',function(req,res){
    //req.session.user = null;
    req.session.destroy(function(err){
        if(err) console.log("session销毁失败.");
        else console.log("session被销毁.");
    });
    res.redirect('/');
});

//登录检测，未登录则跳到登录页，否则继续执行
function checkLogin(req, res, next){
    if(!req.session.user){
        console.error('error : 未登录');
        return res.redirect('/login');
    }
    //放行
    next();
}

function checkNotLogin(req,res,next){
    if(req.session.user){
        console.log(req.session.user);
        console.error("error: 已登入");
        return res.redirect('/');
    }
    next();
};

module.exports = router;
