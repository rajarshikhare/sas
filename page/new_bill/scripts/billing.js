
document.getElementById("invoice_no").innerHTML += "52";

var d = new Date();
document.getElementById("current_date").innerHTML += d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();


function add_item(item_name, item_price) {
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var button = document.createElement("button");
    button.setAttribute("onclick", 'remove_item("' + item_name + '")');
    var img = document.createElement("img");
    img.setAttribute("height", "14");
    img.setAttribute("width", "14");
    img.setAttribute("src", "static/delete.svg");
    button.appendChild(img);
    var node1 = document.createTextNode(item_name);
    var node2 = document.createTextNode(item_price);
    td1.appendChild(node1);
    td2.appendChild(node2);
    td3.appendChild(button);
    tr.appendChild(td1);
    tr.appendChild(td3);
    tr.appendChild(td2);
    tr.setAttribute("id", item_name);
    var element = document.getElementById("main_table");
    element.appendChild(tr);
    window.scrollBy(0, 100);
}


var i = 3;
add_item("Maggie1", "20 INR");
add_item("Maggie2", "20 INR");
add_item("Maggie3", "20 INR");
add_item("Maggie4", "20 INR");

//setInterval(function(){add_item("Maggie", "20 INR", i++)}, 1000);

function remove_item(item_name){
    console.log("'#" + item_name + "'");
    $('"#' + item_name + '"').remove();
}