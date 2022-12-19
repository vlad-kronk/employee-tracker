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
    for(let i = 0; i < sentence.length; i++){
            sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
        }
    return sentence.join(" ");
}

// wrapping fs.readFile in a promise
async function readFile(filePath) {
    try {
      const data = await fs.promises.readFile(filePath, 'utf8');
      return data;
    }
    catch(err) {
      console.log(err);
    }
}

// refresh local arrays

async function refreshDepartments(db) {
    temp = await db.query("select * from department");
    departments = temp[0];
}

async function refreshRoles(db) {
    temp = await db.query("select * from role");
    roles = temp[0];
}

async function refreshEmployees(db) {
    temp = await db.query("select * from employee");
    employees = temp[0];
}

// ^^^^^^^^^^^^^^^^^^^

// init
async function init(db) {
    await refreshDepartments(db);
    await refreshRoles(db);
    await refreshEmployees(db);
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
// arguments:
//      table: str (must be either 'employees', 'roles', or 'departments')
//      db: database connection obj
async function getAll(table, db) {
    let query;
    switch (table) {
        case 'employee':
            query = await readFile(`./db/get/employees.sql`);
        case 'role':
            query = await readFile(`./db/get/roles.sql`);
        case 'department':
            query = await readFile(`./db/get/departments.sql`);
    }
    const response = await db.query(query);
    return response[0];
}

async function getAllFromDepartment(dept, db) {

}

// adds an department to the database
// arguments:
//      department: str (name of dept to add)  
//      db: database connection obj
async function addDepartment(department, db) {
    // add the department and refresh the local departments array
    await db.query(`insert into department (name) values (?)`, titleCase(department));
    console.log(`Added ${department} department.`);
    await refreshDepartments(db);
}

// add a role to the database
// validates department input
// arguments:
//      title: str
//      salary: integer
//      department: str (name of department)
//      db: database connection obj
async function addRole(title, salary, department, db) {
    // will be 0 if department doesn't exist, otherwise will be the ID of the department specified
    const deptID = departments.findIndex(o => o.name === department)+1;
    if (deptID !== 0) {
        // add the role and refresh the local roles array
        await db.query(`insert into role (title, salary, department_id) values (?, ?, ?)`,
        [titleCase(title), salary, deptID]);
        console.log(`Added ${title} role to ${department} department.`);
        await refreshRoles(db);
    } else {
        console.log(`Department ${department} doesn't exist.`);
    }
}

// adds an employee to the database
// arguments:
//      first_name: str
//      last_name: str
//      manager: str (manager's first and last name, empty string if no manager)
//      role: str (role title)
//      db: database connection obj
async function addEmployee(first_name, last_name, manager, role, db) {
    // will be 0 if role doesn't exist, otherwise will be the ID of the role specified
    const roleID = roles.findIndex(o => o.title === role)+1;
    console.log(`roleID:${roleID}`);
    
    // value to insert into manager field, default to null
    let managerID = null;

    // did the user want a manager?
    if (manager !== "") {
        console.log(`manager is not null`);
        // will be 0 if the employee doesn't exist, otherwise will be the ID of the manager specified
        managerID = employees.findIndex(o => o.first_name.concat(" ", o.last_name) === manager)+1;
        console.log(`${manager}'s employeeID:${managerID}`);
    }

    // were both the role and the manager name valid?
    if (roleID !== 0 && managerID !== 0) {
        // add the employee and refresh the local employees array
        await db.query(`insert into employee (first_name, last_name, manager_id, role_id) values (?, ?, ?, ?)`,
        [first_name, last_name, managerID, roleID]);
        console.log(`Added employee ${first_name} ${last_name}.`);
        await refreshEmployees(db);
    } else {
        console.log(`Invalid role or manager name. roleID:${roleID} managerID:${managerID}`);
    }
}

// updates a single employee's role
// includes input verification
// arguments:
//      employee_name: str (employee's full name)
//      new_role: str (title of employee's updated role)
//      db: database connection obj
async function updateEmployeeRole(employee_name, new_role, db) {

    const employeeID = employees.findIndex(o => o.first_name.concat(" ", o.last_name) === employee_name)+1;
    const roleID = roles.findIndex(o => o.title === new_role)+1;

    if (roleID !== 0 && employeeID !== 0) {
        await db.query(`update employee set role_id = ? where id = ?`, [roleID, employeeID]);
        console.log(`Updated ${employee_name} to be assigned to ${new_role} role.`);
        await refreshEmployees(db);
    } else {
        console.log(`Invalid role or employee name. roleID:${roleID} employeeID:${employeeID}`);
    }
}

// updates a single employee's manager
// includes input verification
// arguments:
//      employee_name: str (employee's full name)
//      new_manager: str (new manager's full name)
//      db: database connection obj
async function updateEmployeeManager(employee_name, new_manager, db) {
    const employeeID = employees.findIndex(o => o.first_name.concat(" ", o.last_name) === employee_name)+1;
    let managerID = null;
    
    if (new_manager !== '') {
        managerID = employees.findIndex(o => o.first_name.concat(" ", o.last_name) === new_manager)+1;
    }

    if (managerID !== 0 && employeeID !== 0 && managerID !== employeeID) {
        await db.query(`update employee set manager_id = ? where id = ?`, [managerID, employeeID]);
        if (managerID !== null) {
            console.log(`Updated ${employee_name} to be assigned to ${new_manager}'s team.`);
        } else {
            console.log(`Updated ${employee_name} to have no manager.`);
        }
        await refreshEmployees(db);
    } else {
        console.log(`Invalid manager or employee name. managerID:${managerID} employeeID:${employeeID}`);
    }
}

async function test() {

    // create connection to database
    const db = await mysql.createConnection(
        {
        host: "localhost",
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        },
        console.log(`Connected to database.`)
    );

    // sanitize database
    // await db.query("source db/schema.sql");
    // await db.query("source db/seeds.sql");

    // initialize variables after forming connection
    await refreshDepartments(db);
    await refreshRoles(db);
    await refreshEmployees(db);

    // await addDepartment("Marketing", db);

    // await addRole("Designer", 110000, "Marketing", db);
    // await addRole("Marketing Lead", 165000, "Marketing", db);

    // await addEmployee("Sanaz", "Episcopo", "", "Marketing Lead", db);
    // await addEmployee("Colm", "Roncalli", "Sanaz Episcopo", "Designer", db);
    // await addEmployee("Jinan", "Sadler", "Sanaz Episcopo", "Designer", db);
    

    // await addEmployee("Mai", "Roux", "Tiziano Abbey", "Lawyer");

    // await updateEmployeeRole("Mohamad Bonhomme", "Legal Secretary", db);

    // await updateEmployeeManager("Mohamad Bonhomme", "Camilla Tierney", db);

    console.table(await getAll("departments", db));
    console.table(await getAll("roles", db));
    console.table(await getAll("employees", db));
    

    db.end();
}

test();

module.exports = { init, getAll, addDepartment, addRole, addEmployee }