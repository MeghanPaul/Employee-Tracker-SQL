const inquirer = require("inquirer");
const mysql = require('mysql2');

const db = require('./db/connection.js');

/* mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'frankieolive',
        database: 'company'
    }
);
 */
/* db.connect(err => {
    if (err) throw err;
    console.log('connected to company database');
}); */

init();

function mainMenuPrompt() {
    inquirer.prompt(
        {
            type: 'list',
            name: 'selection',
            message: 'Please select an action from the menu below',
            choices: ['View All Departments','View All Roles','View All Employees','Add a Department','Add an Employee', 'Add a Role', 'Update an Employee\'s Role','Exit']
        }
    ).then(menuAnswer => {
        console.log(menuAnswer);
        if(menuAnswer.selection === 'View All Departments'){
           db.query('SELECT * FROM departments', (err, data) => {
               if(err) throw err;
               console.table(data);
               return data;
           });
           //mainMenuPrompt();
        }/* else if(menuAnswer === 'View All Roles'){

        }else if(menuAnswer === 'View All Employees'){

        }else if(menuAnswer === 'Add an Employee'){

        }else if(menuAnswer === 'Add a Role'){

        }else if(menuAnswer === 'Update an Employee\'s Role'){
            break;
        } */
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

/* function promptUser() {
    mainMenuPrompt();   
} */

//promptUser().then();

function init() {
   /*  db.query('SELECT * FROM departments', (err, result) => {
        if(err) throw err;
        console.table(result);
    }) */
    mainMenuPrompt();
}