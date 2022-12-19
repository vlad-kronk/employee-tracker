const inquirer = require('inquirer');
const ctable = require('console.table');
const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();

// ----------- GLOBALS -----------

let departments;
let roles;
let employees;

// ----------- HELPERS -----------


// forces title case
function titleCase(str) {
    let sentence = str.toLowerCase().split(" ");
    for(let i = 0; i< sentence.length; i++){
            sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
        }
    return sentence.join(" ");
}

// wrapping fs.readFile in a promise
async function readFile(filePath) {
    try {
      const data = await fs.promises.readFile(filePath, 'utf8')
      return data
    }
    catch(err) {
      console.log(err)
    }
}

// refresh local departments array
async function refreshDepartments() {
    departments = await db.query("select * from department");
    departments = departments[0];
}

async function refreshRoles() {
    roles = await db.query("select * from role");
    roles = roles[0];
}

async function refreshEmployees() {
    employees = await db.query("select * from employee");
    employees = employees[0];
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

// adds an department to the database
async function addDepartment(department, db) {
    // add the department and refresh the local departments array
    await db.query(`insert into department (name) values ("?")`, forceTitleCase(department));
    await refreshDepartments();
}

// add a role to the database
// validates department input
async function addRole(title, salary, department, db) {
    // will be 0 if department doesn't exist, otherwise will be the ID of the department specified
    const deptID = departments.find(o => o.name === department)+1;
    if (deptID !== 0) {
        // add the role and refresh the local roles array
        await db.query(`insert into role (title, salary, department_id) values ("?", ?, ?)`,
        [title, salary, deptID]);
        await refreshRoles();
    } else {
        console.log(`Department ${department} doesn't exist.`);
    }
}

async function addEmployee(first_name, last_name, manager, role, db) {
    // will be 0 if role doesn't exist, otherwise will be the ID of the role specified
    const roleID = roles.find(o => o.title === role)+1;
    
    // value to insert into manager field, default to null
    let managerID = null;

    // did the user want a manager?
    if (manager !== "") {
        // will be 0 if the employee doesn't exist, otherwise will be the ID of the manager specified
        managerID = employees.find(o => o.first_name.concat(" ", o.last_name) === manager)+1;
    }

    // 
    if (roleID !== 0 && managerID !== 0) {
        // add the employee and 
    }
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

    // initialize variables after forming connection
    await refreshDepartments();
    await refreshRoles();
    await refreshEmployees();

    
    

    // console.table(await getAll("departments", db));

    // console.table(await getAll("roles", db));

    // console.table(await getAll("employees", db));

    // console.table(departments);
    // console.table(roles);
    // console.table(employees);


    db.end();
}

main();