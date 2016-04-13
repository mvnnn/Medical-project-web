var Medical=require('../model/medical');
var mongoose=require('mongoose');
var nodemailer = require('nodemailer');

exports.index=function(err,res){
  Medical.find(function(err,respo){

    if(respo){
          respo = respo;
        }
        else{
          respo = null;
        }
    res.render('home',{data:respo});
  });
};

exports.new_post=function(req,res){
  var post = new Medical({
  name : req.body.name,
  email : req.body.email,
  medicine : req.body.medicine,
  time : req.body.time,
  address : req.body.address,
  mobile : req.body.mobile,
  doctor : req.body.doctor
  });
  post.save(mongoose);

  var smtp = nodemailer.createTransport("SMTP", {
      service: "Gmail",
      auth: {
          user: "sen15.2016@gmail.com",
          pass: "senteam15"
      }
  });

  mailList ={};
  mailList.to = req.body.email;
  mailList.subject = "Medicine warn";
  mailList.text = 'This "'+ req.body.medicine+'" Medicine take at "'+ req.body.time+'" ';
  smtp.sendMail(mailList, function(error, response){
      if(error){
          console.log(error);
      }
      else{
          console.log("Message sent: " + response.message);
      }
  });


  res.redirect('/Order');
};

exports.get_update = function (req,res){
  Medical.findOne({_id:req.params.id},function(err,respo){
    // console.log(respo);
    if(err) throw err;
    res.render('update',{data:respo});
  });
};

exports.post_update = function (req,res){
  Medical.update({_id: req.params.id},
    {name : req.body.name,
    email : req.body.email,
    medicine : req.body.medicine,
    time : req.body.time,
    address : req.body.address,
    mobile : req.body.mobile,
    doctor : req.body.doctor
    },
    function(err){
      if(err) throw err;
      else res.redirect('/Order');
    });
};

exports.get_delete = function (req,res){
 Medical.remove({_id: req.params.id},function(err){
  if(err) throw err;
  else res.redirect('/Order');
});
};
