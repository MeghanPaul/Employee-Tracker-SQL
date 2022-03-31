const inquirer = require("inquirer");
const mysql = require("mysql2/promise");

const db = require("./db/connection.js");

let { viewAllDepts, addDept } = require("./utils/departments");
let { viewAllRoles, getAllRoleNames } = require("./utils/roles");
let { viewAllEmployees, addEmployee, getAllEmployeeNames} = require("./utils/employees");

const mainMenuQuestionArr = [
  {
    type: "list",
    name: "selection",
    message: "Please select an action from the menu below",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Add an Employee",
      "Add a Role",
      "Update an Employee's Role",
      "Exit",
    ],
  },
];

async function mainMenuPrompt() {
  return inquirer.prompt(mainMenuQuestionArr).then(({ selection }) => {
    switch (selection) {
      case "View All Departments":
        viewAllDepts().then(([rows, fields]) => {
          console.table(rows);
          mainMenuPrompt();
        });
        break;
      case "View All Roles":
        viewAllRoles().then(([rows, fields]) => {
          console.table(rows);
          mainMenuPrompt();
        });
        break;
      case "View All Employees":
        viewAllEmployees().then(([rows, fields]) => {
          console.table(rows);
          mainMenuPrompt();
        });
        break;
      case "Add a Department":
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "Enter the name of the new department: ",
            },
          ])
          .then(({ name }) => {
            addDept(name);
          })
          .then((data) => {
            console.log("New department added!");
            mainMenuPrompt();
          });
        break;
      case "Add an Employee":
        getAllRoleNames().then((rolesArr) => {
          console.log(rolesArr);
          getAllEmployeeNames().then((employeesArr) => {
              employeesArr.push('None');
            const empQuestions = [
              {
                type: "input",
                name: "first_name",
                message: "Enter the employee's first name: ",
              },
              {
                type: "input",
                name: "last_name",
                message: "Enter the employee's last name: ",
              },
              {
                type: "list",
                name: "role",
                message: "Select the employee's role: ",
                choices: rolesArr,
              },
              {
                type: "list",
                name: "manager",
                message: "Select the employee's manager: ",
                choices: employeesArr
              },
            ];
            inquirer
              .prompt(empQuestions)
              .then(({ first_name, last_name, role, manager }) => {
                return addEmployee(first_name, last_name, role, manager)
              })
              .then((data) => {
                console.log("New employee added!");
                mainMenuPrompt();
              });
          });
        });

        break;
      case "Add a Role":
        console.log(6);
        break;
      case "Update an Employee's Role":
        console.log(7);
        break;
      default:
        return Promise.resolve();
    }
  });
}

function addEmpPrompt() {
  inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Employee's First Name: ",
    },
    {
      type: "input",
      name: "last_name",
      message: "Employee's Last Name: ",
    },
    {
      type: "list",
      name: "role",
      message: "Select the employee's role, or add a new role: ",
      choices: [], //reference roles table
    },
    {
      type: "list",
      name: "manager",
      message: "Select the employee's manager, or add a new employee: ",
      choices: [], //reference employees table
    },
  ]);
}

function addDeptPrompt() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter name of new department: ",
    },
  ]);
}

function addRolePrompt() {
  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter new role's title: ",
    },
    {
      type: "input",
      name: "salary",
      message: "Enter the salary: ",
    },
    {
      type: "list",
      name: "department",
      message: "Select the department for this role, or add a new department: ",
      choices: [], //reference departments table
    },
  ]);
}

function updateEmpRolePrompt() {
  inquirer.prompt([
    {
      type: "list",
      name: "employee",
      message: "Select an employee to update their role: ",
      choices: [], //reference employees table
    },
    {
      type: "list",
      name: "role",
      message:
        "Select the updated role, or add a new role to assign to this employee: ",
      choices: [], //reference roles table
    },
  ]);
}

/* viewAllDepts().then(([rows,fields])=>{
    console.log(rows);
}); */
mainMenuPrompt();
