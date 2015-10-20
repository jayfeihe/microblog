/**
 * Blog的Service逻辑层代码
 * Created by Jay He on 2015/10/19.
 */

var Blog = require('../models/blog');

function BlogService(){
    //添加微博
    this.publish = function(req,res){
        //1.检测微博内容
        if(req.body.content==''){
            console.log('微博内容不能为空！');
            return res.render('reg',{title:'用户注册',
                user:req.session.user,
                success:'',
                error:'微博内容不能为空！'});
        }else {
            //2.获取当前用户和时间，创建微博
            var newBlog = new Blog({
                content:req.body.content,
                user:req.session.user,
                publishTime:Date.now()
            });

            //3.保存发布微博
            newBlog.save(function(err){
                if(err){
                    console.error('发布微博失败: '+err);
                }else{
                    console.log("发布成功！");
                    return res.redirect('/');
                }

            });

        }
    }

    //获取用户自己发布过的微博
    this.getBlogOwn = function(req,res){
        Blog.findByUsername(req.session.user,function(err,list){
                res.render('list',{
                    title:'用户微博查询',
                    user:req.session.user,
                    list:list,
                    success:'',
                    error:''
                });
        });
    }

}

module.exports=BlogService;
