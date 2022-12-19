const inquirer = require('inquirer');
const ctable = require('console.table');
const mysql = require('mysql2/promise');
require('dotenv').config();

// departments:
//     1. Sales
//     2. Engineering
//     3. Finance
//     4. Legal

// roles: 
//     1. Salesperson
//     2. Sales Manager
//     3. Accountant
//     4. Accounting Manager
//     5. Software Engineer
//     6. Lead Engineer
//     7. Lawyer
//     8. Legal Team Lead
//     9. Legal Secretary

async function createEmployee() {

}

async function main() {

    // create connection to database
    const db = await mysql.createConnection(
        {
        host: "localhost",
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        },
        console.log(`Connected to the ${process.env.DB_NAME} database.`)
    );


    const test = await db.query("select * from employee");
    console.log(test[0]);
    
}

main();