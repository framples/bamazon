let mysql = require("mysql");
let inquirer = require("inquirer");


let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "3306",
    password: "Blitzcrank13",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL DB");
    showProducts();
    selectItemId();

})

function showProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
    })
}


function selectItemId() {

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].item_id);
                        }
                        return choiceArray;
                    },
                    message: "What item are you intersted in buying? Please enter the Item ID(number on far left)."
                },
                {
                    name: "purchasequantity",
                    type: "input",
                    message: "How many would you like to purchase?"
                }
            ])
            .then(function (answer) {
                let chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id === answer.choice) {
                        chosenItem = results[i];
                    }
                }

                if (chosenItem.stock_quantity <= parseInt(answer.purchasequantity)) {
                    console.log("Sorry...we don't have enough in stock.");

                }
                else {
                    console.log("Fantastic - we have enough in stock! ENJOY");
                
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [{
                            stock_quantity: answer.purchasequantity
                        }


                        ]
                    )

                }
            });
    });
}
