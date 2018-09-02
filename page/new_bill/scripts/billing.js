
document.getElementById("invoice_no").innerHTML += "52";

var d = new Date();
document.getElementById("current_date").innerHTML += d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();


var items = new Map();

function addItem(item_name, quantity, item_price) {

    if (items.has(item_name)) {
        var tmp = document.getElementById(item_name);
        qt = tmp.getElementsByTagName("input");
        qt[0].value = parseInt(qt[0].value) + quantity;
        updatePrice(item_name);
        return;
    }
    var tr = document.createElement("tr");
    //Item Name***************
    var td1 = document.createElement("td");
    var node1 = document.createTextNode(item_name);
    td1.appendChild(node1);
    //Quantity*****************
    var td2 = document.createElement("td");
    var node2 = document.createElement("input");
    node2.type = "text";
    node2.value = quantity;
    node2.setAttribute("onchange", 'updatePrice("' + item_name + '")');
    td2.appendChild(node2);
    //Remove item***************
    var td3 = document.createElement("td");
    var button = document.createElement("button");
    button.setAttribute("onclick", 'removeItem("' + item_name + '")');
    var img = document.createElement("img");
    img.setAttribute("height", "14");
    img.setAttribute("width", "14");
    img.setAttribute("src", "static/delete.svg");
    button.appendChild(img);
    td3.appendChild(button);
    //Per price
    var td4 = document.createElement("td");
    td4.setAttribute("class", "per_price");
    var node3 = document.createTextNode(item_price);
    td4.appendChild(node3);
    //Price
    var td5 = document.createElement("td");
    td5.setAttribute("class", "price");
    var node4 = document.createTextNode(item_price * quantity);
    td5.appendChild(node4);
    //**************************/
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.setAttribute("id", item_name);
    var element = document.getElementById("main_table");
    element.appendChild(tr);
    window.scrollBy(0, 100);
    items.set(item_name, item_price * quantity);
    updateTotal();
}

function removeItem(item_name) {
    items.delete(item_name);
    $("#" + item_name).remove();
    updateTotal();
}

function updatePrice(item_name) {
    var tmp = document.getElementById(item_name);
    price = tmp.getElementsByClassName("price");
    per_price = tmp.getElementsByClassName("per_price");
    quantity = tmp.getElementsByTagName("input");
    price[0].innerHTML = per_price[0].innerHTML * quantity[0].value;
    items.set(item_name, per_price[0].innerHTML * quantity[0].value);
    updateTotal();
}

function updateTotal() {
    var sum = 0;
    var mapiter = items.values();
    for (p of mapiter) {
        sum += p;
    }
    document.getElementsByClassName("total")[0].cells[1].innerHTML = "Total: " + sum;
}


$(function() {
    var socket = io.connect("http://localhost:5000");
    socket.emit('app', '');


    socket.on('phone connected', function(data){
        console.log("gota");
        $("img#connected").attr("src","static/connected.svg");
    });

    socket.on('disconnected phone' , function(){
        $("img#connected").attr("src","static/disconnected.svg");
    });

    socket.on('Add item on page', function(data){
        addItem(data['Product Name'], data['Quantity'], data['Per Price']);
    });
})