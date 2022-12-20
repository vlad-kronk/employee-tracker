const ctable = require('console.table');
const mysql = require('mysql2/promise');
const inq = require('inquirer');
const fs = require('fs');
require('dotenv').config();

const dbUtil = require('./db');

const prompt = inq.createPromptModule();

async function activityPrompt() {
    const activityQuestion = [{
        type: "list",
        name: "act",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee's role",
            "Update an employee's manager",
            "Exit"
        ]
    }];

    const result = await prompt(activityQuestion);

    return result.act;
}

async function addDepartmentPrompts() {
    const questions = [{
        type: "input",
        name: "dept",
        message: "Name of department:"
    }];

    const result = await prompt(questions);
    // console.log(result);
    
    return result;
}

async function addRolePrompts() {
    const questions = [
        {
            type: "input",
            name: "title",
            message: "Title of position:"
        }, {
            type: "number",
            name: "salary",
            message: "Salary of position:"
        }, {
            type: "input",
            name: "dept",
            message: "Department of position:"
        }
    ];

    const result = await prompt(questions);
    
    return result;    
}

async function addEmployeePrompts() {
    const questions = [
        {
            type: "input",
            name: "first_name",
            message: "First name:"
        }, {
            type: "input",
            name: "last_name",
            message: "Last name:"
        }, {
            type: "input",
            name: "role",
            message: "Role:"
        }, {
            type: "input",
            name: "manager",
            message: "Manager's name:"
        }
    ];

    const result = await prompt(questions);
    
    return result;
}

async function updateEmployeeRolePrompts() {
    const questions = [
        {
            type: "input",
            name: "name",
            message: "Employee's full name:"
        }, {
            type: "input",
            name: "new_role",
            message: "Employee's new role:"
        }
    ]

    const result = await prompt(questions);

    return result;
}

async function updateEmployeeManagerPrompts() {
    const questions = [
        {
            type: "input",
            name: "name",
            message: "Employee's full name:"
        }, {
            type: "input",
            name: "new_manager",
            message: "Employee's new manager:"
        }
    ]

    const result = await prompt(questions);

    return result;
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
        console.log(`Connected to database.`)
    );

    dbUtil.init(db);

    while (true) {
        // var to contain inquirer response objects
        let r;

        switch (await activityPrompt()) {
            case "View all departments":
                console.table(await dbUtil.getAll('departments', db));
                break;
            case "View all roles":
                console.table(await dbUtil.getAll('roles', db));
                break;
            case "View all employees":
                console.table(await dbUtil.getAll('employees', db));
                break;
            case "Add a department":
                r = await addDepartmentPrompts();
                await dbUtil.addDepartment(r.dept, db);
                break;
            case "Add a role":
                r = await addRolePrompts();
                await dbUtil.addRole(r.title, r.salary, r.dept, db);
                break;
            case "Add an employee":
                r = await addEmployeePrompts();
                await dbUtil.addEmployee(r.first_name, r.last_name, r.manager, r.role, db);
                break;
            case "Update an employee's role":
                r = await updateEmployeeRolePrompts();
                await dbUtil.updateEmployeeRole(r.name, r.new_role, db);
                break;
            case "Update an employee's manager":
                r = await updateEmployeeManagerPrompts();
                await dbUtil.updateEmployeeManager(r.name, r.new_manager, db);
                break;
            case "Exit":
                console.log("Bye");
                db.end();
                process.exit(0);
        }
    }
}

main();