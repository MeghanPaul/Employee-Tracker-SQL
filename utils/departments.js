const db = require("../db/connection");
const mysql = require("mysql2/promise");

function viewAllDepts() {
  return Promise.resolve(
    db.promise().query("SELECT * FROM departments")
  );
}

let addDept = () => {};

module.exports = { viewAllDepts, addDept };
