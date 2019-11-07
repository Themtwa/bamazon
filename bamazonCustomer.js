const inquirer = require('inquirer');
const mysql = require('mysql');
const chalk = require('chalk');
require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'notmynormal',
    database: 'bamazon'
});

let products;
let firstRunTime = true;

function loadProducts() {
    let queryProducts = 'SELECT * FROM products';
    connection.query(queryProducts, function (error, results) {
        if (error) {
            console.log('Connection error occured!');
        } else {
            products = results;
        }
        if (firstRunTime) {
            firstRunTime = false;
            console.table(products)
            sellProducts()
        }
    });
}

let updateProducts = function (product_name, amount_purchased, cost, sales) {
    let queryProducts = 'UPDATE products SET stock_quantity = stock_quantity - ?, product_sales = ? WHERE ?';
    connection.query(queryProducts, [amount_purchased, sales, {
        product_name: product_name
    }], function (error, results) {
        if (error) throw error;
        console.log(chalk.green('You purchased ' + product_name + ' at a quantity of ' + amount_purchased +
            '.\nYour total amount charged is $' + cost.toFixed(2) + '.'));
        loadProducts();
        buyAgain();
    });
}

function sellProducts() {
    inquirer.prompt([{
        name: 'prod_id',
        message: chalk.blue('What is the ID of the product you want to buy?'),
        validate: function (value) {
            if (/[0-9]/g.test(value) && value > 0 && value <= products.length) {
                if (products[value - 1].stock_quantity < 1) {
                    return 'Out of stock! Choose another item!';
                }
                return true;
            }
            return 'Enter a valid ID!';
        }
    }]).then(function (answer) {
        console.log(chalk.green('\nYou selected ' + products[answer.prod_id - 1].product_name + '. There are ' + products[answer.prod_id - 1].stock_quantity + ' available to purchase.'));
        inquirer.prompt({
            name: 'quantity',
            message: chalk.blue('How many do you wish to buy?'),
            validate: function (value) {
                if (/[0-9]/g.test(value) && value > 0 && value <= products[answer.prod_id - 1].stock_quantity) {
                    return true;
                }
                return chalk.redBright('Enter in a valid stock quantity');
            }
        }).then(function (quantity_answer) {
            let cost = products[answer.prod_id - 1].price * quantity_answer.quantity;
            let sales = products[answer.prod_id - 1].product_sales + cost;
            updateProducts(products[answer.prod_id - 1].product_name, quantity_answer.quantity, cost, sales);
        })
    });
}

function buyAgain() {
    inquirer.prompt({
        name: 'buyAgain',
        message: 'Do you want to purchase another item?',
        type: 'confirm'
    }).then(function (answer) {
        if (answer.again) {
            console.table(products)
            sellProducts();
        } else {
            connection.end();
        }
    });
}
loadProducts();