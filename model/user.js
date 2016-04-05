var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var postSchema= Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  medicine:{
    type:String,
    required:true
  },
  time:{
    type:String,
    required:true
  }
});

module.exports=mongoose.model('user',postSchema);
