const inquirer = require("inquirer");
const mysql = require("mysql2/promise");

const db = require("./db/connection.js");

let { viewAllDepts, addDept, getAllDeptNames } = require("./utils/departments");
let { viewAllRoles, getAllRoleNames, addRole } = require("./utils/roles");
let {
  viewAllEmployees,
  addEmployee,
  getAllEmployeeNames, updateRole
} = require("./utils/employees");

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
          getAllEmployeeNames().then((employeesArr) => {
            employeesArr.push("None");
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
                choices: employeesArr,
              },
            ];
            inquirer
              .prompt(empQuestions)
              .then(({ first_name, last_name, role, manager }) => {
                return addEmployee(first_name, last_name, role, manager);
              })
              .then((data) => {
                console.log("New employee added!");
                mainMenuPrompt();
              });
          });
        });

        break;
      case "Add a Role":
        getAllDeptNames().then((deptsArr) => {
          const roleQuestions = [
            {
              type: "input",
              name: "title",
              message: "Enter the role's title: ",
            },
            {
              type: "input",
              name: "salary",
              message: "Enter the role's salary: ",
            },
            {
              type: "list",
              name: "dept",
              message: "Select which department the role belongs to: ",
              choices: deptsArr,
            },
          ];
          inquirer
            .prompt(roleQuestions)
            .then(({ title, salary, dept }) => {
              return addRole(title, salary, dept);
            })
            .then((data) => {
              console.log("New Role Added!");
              mainMenuPrompt();
            });
        });
        break;
      case "Update an Employee's Role":
        getAllEmployeeNames().then(( empArr ) => {
          getAllRoleNames().then(( rolesArr ) => {
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "name",
                  message: "Select an employee to update their role: ",
                  choices: empArr,
                },
                {
                  type: "list",
                  name: "role",
                  message: "Select a role to give them: ",
                  choices: rolesArr,
                },
              ])
              .then(({ name, role }) => {
                return updateRole(name, role);
              })
              .then(({ data }) => {
                console.log("Employee role updated!");
                mainMenuPrompt();
              });
          });
        });
        break;
      default:
        process.exit();
        break;
    }
  });
}

mainMenuPrompt();
