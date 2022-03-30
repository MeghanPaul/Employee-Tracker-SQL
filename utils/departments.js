const db = require("../db/connection");

function viewAllDepts() {
  return Promise.resolve(
    db.promise().query("SELECT * FROM departments")
  );
}

function addDept(name) {
  return Promise.resolve(
    db.promise().query(`INSERT INTO departments (name) VALUES (?);`,name)
  );
}

module.exports = { viewAllDepts, addDept };
