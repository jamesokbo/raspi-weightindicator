//Initialize express framework
var express =require('express');
var app=express();

var http= require('http').Server(app);
var io=require('socket.io')(http);

//native NodeJS module for resolving paths
var path=require('path');

var bodyParser =require('body-parser');
var methodOverride= require('method-override');


var cookieParser=require('cookie-parser');
var session = require('express-session');

app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({secret: 'jaimeo580324', saveUninitialized: true, resave: true}));


var port= 8080;

app.set('view engine','ejs');
app.set('views', path.resolve(__dirname,'client','views'));
app.use(express.static(path.resolve(__dirname,'client')));

//DECLARACIÓN DE RUTAS DE APIS:
app.get('/',function(req,res){
  res.render('index.html');
});

//userAPI:
var userapi= express.Router();
require('./server/routes/simpleUserApi')(userapi, session);
app.use('/',userapi);

io.on('connection', function(socket){
  console.log('A user has connected');
  //Cuando el usuario se desconecta
  socket.on('disconnect', function(){
    socket.disconnect();
    console.log('One user has left');
  });
});

http.listen(port, function(){
  console.log('server running @ port:'+port);
});