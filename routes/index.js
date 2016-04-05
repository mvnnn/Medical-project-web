var Post=require('../model/user');

exports.index=function(err,res){
  Post.find(function(err,posts){
    if(err) throw error
    res.render('home',{posts:posts});
  });
};

exports.new_post=function(req,res){
  var post = new Post({
  name : req.body.name,
  email : req.body.email,
  medicine : req.body.medicine
  });
  post.save(function(err){
    if(err) throw error
    else res.redirect('/Order');
  });
};

exports.get_update = function (req,res){
  Post.findOne({_id:req.params.id},function(err,postss){
    if(err) throw err;
    res.render('update',{posts:postss});
  });
};

exports.post_update = function (req,res){
  Post.update({_id: req.params.id},
    {name:req.body.name,
    job:req.body.email,
    medicine:req.body.medicine},
    function(err){
      if(err) throw err;
      else res.redirect('/Order');
    });
};

exports.get_delete = function (req,res){
 Post.remove({_id: req.params.id},function(err){
  if(err) throw err;
  else res.redirect('/Order');
});
};
