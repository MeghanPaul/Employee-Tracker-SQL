const db = require("../db/connection");
let {getIdByRoleTitle} = require ('./roles.js');

function viewAllEmployees() {
  return Promise.resolve(db.promise().query("SELECT * FROM employees"));
}

async function addEmployee(first_name, last_name, role, manager) {
  if(manager == 'None') {
    manager = null;
  }else {
    manager = await getIdByEmployeeName(manager);
  }

  role = await getIdByRoleTitle(role);

  const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', ${role}, ${manager});`;
  Promise.resolve(db.promise().query(query));
}

function getAllEmployeeNames() {
  const query = 'SELECT first_name,last_name FROM employees;';
  return Promise.resolve(
      db.promise().query(query)
      .then(([rows,fields]) => {
          return rows.map(employee => employee.first_name + ' ' + employee.last_name);
      })
  );
}

function getIdByEmployeeName(name) {
  const first_name = name.split(' ')[0];
  const query = `SELECT id FROM employees WHERE first_name = '${first_name}';`;
    //console.log(query);
    return Promise.resolve(
        db.promise().query(query)
        .then(([rows,fields]) => {
            const result = rows.map(emp=>emp.id);
            return result;
        })
    );
}

async function updateRole(name, role) {
  const first_name = name.split(' ')[0];
  role = await getIdByRoleTitle(role);
  const query = `UPDATE employees SET role_id = '${role}' WHERE first_name = '${first_name}';`
  return Promise.resolve(
    db.promise().query(query)
  );
}

module.exports = { updateRole, viewAllEmployees, addEmployee, getAllEmployeeNames};
