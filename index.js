const inquirer = require('inquirer');
const ctable = require('console.table');
const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();


// wrapping fs.readFile in a promise
const readFile = async filePath => {
    try {
      const data = await fs.promises.readFile(filePath, 'utf8')
      return data
    }
    catch(err) {
      console.log(err)
    }
}

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

// executes a prewritten query from a file to return a
// nicely formatted array for console.table
async function getAll(table, db) {
    const query = await readFile(`./db/get/${table}.sql`);
    const response = await db.query(query);
    return response[0];
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


    console.table(await getAll("departments", db));

    console.table(await getAll("roles", db));
    

    db.end();
}

main();