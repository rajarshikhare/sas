// Creating Webserver for Android Qrcode Scaning
var express = require('express');
var app_ = express();
const server = require('http').createServer(app_);
var io = require('socket.io').listen(server)

server.listen(5000, "0.0.0.0");
console.log("Server started");

app_.get('/', function(req, res){
  res.sendFile(__dirname + '/page/new_bill/index.html');
});

app_.get('/static/jquery.min.js', function(req, res){
  res.sendFile(__dirname + '/page/new_bill/static/jquery.min.js');
});

app_.get('/scripts/billing.js', function(req, res){
  res.sendFile(__dirname + '/page/new_bill/scripts/billing.js');
});

app_.get('/static/delete.svg', function(req, res){
  res.sendFile(__dirname + '/page/new_bill/static/delete.svg');
});

app_.get('/static/logo.png', function(req, res){
  res.sendFile(__dirname + '/page/new_bill/static/logo.png');
});

io.sockets.on("connection", function(socket) {
  socket.on('app', function(data){
    console.log("Desktop app connected..");
  });

  socket.on('phone', function(data){
    io.sockets.emit('phone connected', '');
    console.log("Phone app connected..");
  })

  socket.on('disconnect', function(){
    console.log("disconneded phone");
    io.sockets.emit('disconnected phone', '');
  })

  socket.on('item', function(data){
    io.sockets.emit('Add item on page', {"Product Name":data, "Quantity":1, "Per Price": 12});
  })

});