var express = require('express');
var router = express.Router();

var Note = require('../models/note');

/* GET users listing. */
router.get('/notes', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/add', function(req,res){
  res.render('note/add', { title: '首页' ,
    user:req.session.user,
    success:'',
    error:'',
    posts:[]});
});

router.post('/add', function(req, res){
  var newNote = new Note({
    author: req.body.author,
    note: req.body.note
  });

  newNote.save(function(err){
    if(err){
      console.log('便签保存失败');
    }else{
      console.log('便签保存成功');
      res.redirect('/note/list');
    }
  });

});

//列出所有的note便签
router.get('/list', function(req, res){
   Note.find(function(err,list){
    console.log('list '+list)
    res.render('note/list',{
      title:'便签列表',
      user:req.session.user,
      list:list,
      success:'',
      error:''
    });
  });

});

//删除指定的note   --- 这种restful的url，通过req.params.xx 获取 ：xx 的参数值
router.get('/delete/:id',function(req, res){
  Note.remove({_id:req.params.id},function(err){
    if(err){
      console.log('删除便签失败');
    }else{
      console.log('删除便签成功');
      res.redirect('/note/list');
    }
  })
});

module.exports = router;
