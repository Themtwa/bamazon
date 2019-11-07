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
connection.connect(function(error){
    if (error) throw error;
    loadProducts();
});

function loadProducts() {
    connection.query("SELECT * FROM products", function (error, response) {
        if (error) throw error;
        console.table(response)
        customerItemPrompt(response);
    });
}

function customerItemPrompt(inventory) {
    inquirer.prompt([
        {
            
        }
    ])
}