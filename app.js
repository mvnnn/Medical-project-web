var express = require('express');
var http=require ('http');
var path = require('path');
var favicon = require('serve-favicon');
var route = require ('./routes/index');
var info = require ('./routes/info');

var mongoose=require('mongoose');
var dburl='mongodb://student:senteam15@ds011389.mlab.com:11389/courseaid';
mongoose.connect(dburl);

var bodyparser=require('body-parser');
var port=process.env.PORT || 8000 ;


var app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(favicon(path.join('public','bb.ico')));
app.use(bodyparser.json());
var methodOverride = require('method-override');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', info.info)
app.get('/info', info.info)
app.get('/Order', route.index );
app.post('/Order',route.new_post);
app.get('/update/:id',route.get_update );
app.post('/update/:id',route.post_update );
app.get('/delete/:id',route.get_delete );

http.createServer(app).listen(port);
console.log('port listen at :'+ Number(port));
