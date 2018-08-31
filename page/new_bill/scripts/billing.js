
document.getElementById("invoice_no").innerHTML += "52";

var d = new Date();
document.getElementById("current_date").innerHTML += d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();


var items = new Map();

function add_item(item_name, quantity, item_price) {

    if(items.has(item_name)){
        var tmp = document.getElementById(item_name);
        qt = tmp.getElementsByTagName("input");
        qt[0].value = parseInt(qt[0].value) + quantity;
        update_price(item_name);
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
    node2.setAttribute("onchange", 'update_price("' + item_name + '")');
    td2.appendChild(node2);
    //Remove item***************
    var td3 = document.createElement("td");
    var button = document.createElement("button");
    button.setAttribute("onclick", 'remove_item("' + item_name + '")');
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
    var node4 = document.createTextNode(item_price*quantity);
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
    items.set(item_name, item_price*quantity);
}


add_item("Notebook", 5, 32);
add_item("Pen",2, 10);
add_item("A4_Sheets",3, 1);
add_item("Scale",1, 10);
add_item("Notebook", 1, 32);

//setInterval(function(){add_item("A4_Sheets", 1, 1)}, 2000);

function remove_item(item_name){
    items.delete(item_name);
    $("#" + item_name).remove();
    update_total();
}

function update_price(item_name){
    var tmp = document.getElementById(item_name);
    price = tmp.getElementsByClassName("price");
    per_price = tmp.getElementsByClassName("per_price");
    quantity = tmp.getElementsByTagName("input");   
    price[0].innerHTML = per_price[0].innerHTML*quantity[0].value;
    items.set(item_name, per_price[0].innerHTML*quantity[0].value);
    update_total();
}

function update_total(){
    var sum = 0;
    var mapiter = items.values();
    for(p of mapiter){
        sum += p;
    }
    document.getElementsByClassName("total")[0].cells[1].innerHTML = "Total: " + sum;
}