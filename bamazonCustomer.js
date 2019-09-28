let mysql = require("mysql");
let inquirer = require("inquirer");


let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "3306",
    password: "Blitzcrank13",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadID);
    showProducts();
    
})

function showProducts() {
    connection.query("SELECT * FROM products", function(err,res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
    })
}

/*
function start() {
    inquirer
    .prompt({
        name: "itemid",
        message: "What ist he ID of the product you would like to purchase?",
        type: "input"
    })
}
*/