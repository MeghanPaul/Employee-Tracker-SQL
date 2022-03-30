const db = require('../db/connection');

function viewAllEmployees() {
    return Promise.resolve(
        db.promise().query('SELECT * FROM employees')
    );
}

function addEmployee(first_name, last_name, role, manager) {
    const query = (`INSERT INTO employees (first_name, last_name, role, manager) VALUES (${first_name}, ${last_name}, ${role}, ${manager});`);
    console.log(query);
    return Promise.resolve(
      db.promise().query(query)
    );
  }

module.exports = {viewAllEmployees,addEmployee};