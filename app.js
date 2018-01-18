var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let users = [];
let selected;

io.on('connection',(socket) => {
  // console.log(socket.id)

  socket.on('user',(data) => {
    users.push(socket.id);
    io.emit("count",users.length);
  });

  socket.on('play',(data) => {
    if(users.length !== 0) {
      selected = Math.floor(Math.random()*100)%users.length;
      io.to(users[selected]).emit('play','play');
      socket.emit('played',"Played!");
    }
  });

  socket.on('stop',(data) => {
    io.to(users[selected]).emit('stop','stop');
    socket.emit('stopped',"Stopped!");
  })

  socket.on("admin",(data) => {
      io.emit("count",users.length);
  })

  socket.on('disconnect',() => {
    if(users.indexOf(socket.id) !== -1) {
      users.splice(users.indexOf(socket.id),1);
      io.emit("count",users.length)
    }
  })

})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use('/',express.static(path.join(__dirname, 'public')));
app.use('/play/fdsfsdfdsgbunyiniokmazwiuoqhqtwfexbnwerjoiemtcertvertkcrptiefdghfjuykugevrtberbytrnyu',express.static(path.join(__dirname, 'public/play')));

// app.use('/', index);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(3000,() => {
  console.log("Magic happens at http://localhost:3000")
})
