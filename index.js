const inquirer = require('inquirer');
const ctable = require('table');
const mysql = require('mysql2');
require('dotenv').config();

// create connection to database
const db = mysql.createConnection(
    {
      host: "localhost",
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
    console.log(`Connected to the ${process.env.DB_NAME} database.`)
);

