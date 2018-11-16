// Creating Webserver for Android Qrcode Scaning
var express = require('express');
var app_ = express();
const server = require('http').createServer(app_);
var io = require('socket.io').listen(server)

var bodyParser = require('body-parser')
app_.use(bodyParser.json());       // to support JSON-encoded bodies
app_.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

server.listen(5000, "0.0.0.0");
console.log("Server started");





var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var dbo;
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  dbo = db.db("SuperMarket");
});




app_.get('/', function (req, res) {
  res.sendFile(__dirname + '/page/new_bill/index.html');
});

app_.get('/static/jquery.min.js', function (req, res) {
  res.sendFile(__dirname + '/page/new_bill/static/jquery.min.js');
});

app_.get('/scripts/billing.js', function (req, res) {
  res.sendFile(__dirname + '/page/new_bill/scripts/billing.js');
});

app_.get('/static/delete.svg', function (req, res) {
  res.sendFile(__dirname + '/page/new_bill/static/delete.svg');
});

app_.get('/static/logo.png', function (req, res) {
  res.sendFile(__dirname + '/page/new_bill/static/logo.png');
});

app_.get('/get_all_stock', function (req, res) {
  var stk;
  var div_data = `<div class="row header">
  <div class="cell">
    Product Id
  </div>
  <div class="cell">
    Product Id
  </div>
  <div class="cell">
    Quantity
  </div>
  <div class="cell">
							Price
  </div>
  <div class="cell">
		Discount
	</div>
</div>`
    ;
  dbo.collection("Product").find({}).toArray(function (err, result) {
    stk = result;
    console.log(result);
    for (var i = 0; i < result.length; i++) {
      div_data += `<div class="row">
      <div class="cell" data-title="Age">`+ stk[i].P_id + `</div>` + `<div class="cell" data-title="Age">` + stk[i].P_name + `</div>` + `<div class="cell" data-title="Job Title">` + stk[i].P_quantity + `</div>` + `<div class="cell" data-title="Age">` + stk[i].P_price + `</div>` + `<div class="cell" data-title="Age">` + stk[i].P_discount + `</div></div>`;
    }

    var html = div_data;
    res.send(html);
  });
  //console.log(stk);




});


app_.get('/manage_all_stock/:pid', function (req, res) {
  var stk;
  var pid = req.params.pid;
  var div_data = `<div class="row header">
  <div class="cell">
    Product Id
  </div>
  <div class="cell">
    Product Id
  </div>
  <div class="cell">
    Quantity
  </div>
  <div class="cell">
							Price
  </div>
  <div class="cell">
		Discount
  </div>

</div>`
    ;
  dbo.collection("Product").find({P_id:parseInt(pid)}).toArray(function (err, result) {
    stk = result;
        console.log(result);
   var html = `<div class="row">
   
   <div class="cell">
   <input type="text" id="pid" value='${result[0].P_id}'>
   </div>
   <div class="cell">
     <input type="text" id="pname" value="${result[0].P_name}">
   </div>
   <div class="cell">
   <input type="text" id="quantity" value="${result[0].P_quantity}">
   
   </div>
   <div class="cell">
   <input type="text" id="price" value="${result[0].P_price}">
   </div>
   <div class="cell">
   <input type="text" id="discount" value="${result[0].P_discount}">
    
   </div>
  

 </div>
 <input type="submit" onclick="updatedata();" value="update">`;
res.send(html);

  });
  //console.log(stk);




});

app_.get('/update_data/:pid/:pname/:pprice/:pquan/:pdisc',function(req,res){
  var pid = req.params.pid;
  var pname = req.params.pname;
  var pprice = req.params.pprice;
  var pquan = req.params.pquan;
  var pdisc = req.params.pdisc;
  console.log(pid);
  console.log(pname);
  var newvalues = { $set: {P_name: pname, P_price: pprice, P_quantity: pquan, P_discount: pdisc } };
  dbo.collection("Product").updateOne({P_id: parseInt(pid)}, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });

  res.send();
});



app_.get('/get_graph_data/:p_name', function (req, res) {
  var y = [1, 3, 7, 4];
  var date_array= new Array(30);
  for(var i=0;i<30;i++)
  date_array[i]=0;
  var pro_name = req.params.p_name;
  dbo.collection("Orders").find({ P_name: pro_name }).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);

    for(var i=0;i<result.length;i++)
    {
      var d = result[i].O_date.toString();
      var arr = d.split(" ");
      var arr2=arr[0].split("-");
      
      date_array[parseInt(arr[2])]+=1;
      

    }
    console.log(date_array);

    res.send(JSON.stringify({ y: date_array }));
  });

 
});








io.sockets.on("connection", function (socket) {


  socket.on('app', function (data) {
    console.log("Desktop app connected..");
  });

  socket.on('phone', function (data) {
    io.sockets.emit('phone connected', '');
    console.log("Phone app connected..");
  })

  socket.on('disconnect', function () {
    console.log("disconneded phone");
    io.sockets.emit('disconnected phone', '');
  })

  socket.on('item', function (data) {

    var result;

    dbo.collection("Product").find({ P_id: parseInt(data) }).toArray(function (err, result) {
      if (err) throw err;
      io.sockets.emit('Add item on page', { "Product Name": result[0]["P_name"], "Quantity": 1, "Per Price": result[0]["P_price"] });
    });

  })

});

console.log(require('os').networkInterfaces()['WiFi'][1]['address'])
