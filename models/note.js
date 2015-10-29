/**
 * Note便签的dao层
 * Created by Jay He on 2015/10/29.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var util = require('util');

var NoteSchema = new Schema({
    ts:{type:Date, default:Date.now },
    author:String ,
    note:String
});

//创建文档
NoteSchema.statics.add = function(author, note, callback){
    var newNote = new Note();
    newNote.author = author;
    newNote.note = note;
    newNote.save(function(err){
       if(err){
           util.log('Fatal '+err);
           callback(err);
       } else{
           callback(null);
       }
    });
}

module.exports = mongoose.model('Note', NoteSchema);
