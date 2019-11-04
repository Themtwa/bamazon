const inquirer = require('inquirer');
const mysql = require('mysql');
const chalk = require('chalk');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'notmynormal',
    database: 'bamazon'
});