const inquirer = require("inquirer");
const mysql = require('mysql2/promise');

const db = require('./db/connection.js');

let {viewAllDepts, addDept} = require('./utils/departments');
let {viewAllRoles} = require('./utils/roles');
let {viewAllEmployees} = require('./utils/employees');

const mainMenuQuestionArr = [{
    type: 'list',
    name: 'selection',
    message: 'Please select an action from the menu below',
    choices: ['View All Departments','View All Roles','View All Employees','Add a Department','Add an Employee', 'Add a Role', 'Update an Employee\'s Role','Exit']
}];

function mainMenuPrompt () {
    return inquirer.prompt(mainMenuQuestionArr)
    .then(({selection}) => {
        switch(selection) {
            case 'View All Departments':
                console.log(1);
                viewAllDepts()
                .then(([rows,fields])=> {
                    console.table(rows);
                    mainMenuPrompt();
                });
                break;
            case 'View All Roles':
                console.log(2);
                viewAllRoles()
                .then(([rows,fields])=> {
                    console.table(rows);
                    mainMenuPrompt();
                });
                break;
            case 'View All Employees':
                console.log(3);
                viewAllEmployees()
                .then(([rows,fields])=> {
                    console.table(rows);
                    mainMenuPrompt();
                });
                break;
            case 'Add A Department':
                console.log(4);
                break;
            case 'Add an Employee':
                console.log(5);
                break;
            case 'Add a Role':
                console.log(6);
                break;
            case 'Update an Employee\'s Role':
                console.log(7);
                break;
            default:
                console.log(8);
                break;
        }
        
    });
};

function addEmpPrompt() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Employee\'s First Name: '
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Employee\'s Last Name: '
        },
        {
            type: 'list',
            name: 'role',
            message: 'Select the employee\'s role, or add a new role: ',
            choices: []//reference roles table
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Select the employee\'s manager, or add a new employee: ',
            choices: []//reference employees table
        }
    ]);
}

function addDeptPrompt() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter name of new department: '
        }
    ]);
}

function addRolePrompt() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter new role\'s title: '
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary: '
        },
        {
            type: 'list',
            name: 'department',
            message: 'Select the department for this role, or add a new department: ',
            choices: []//reference departments table
        }
    ]);
}

function updateEmpRolePrompt() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Select an employee to update their role: ',
            choices: [] //reference employees table
        },
        {
            type: 'list',
            name: 'role',
            message: 'Select the updated role, or add a new role to assign to this employee: ',
            choices: [] //reference roles table
        }
    ]);
}

mainMenuPrompt();