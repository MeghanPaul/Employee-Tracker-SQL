const db = require("../db/connection");

function viewAllDepts() {
  return Promise.resolve(
    db.promise().query("SELECT * FROM departments")
  );
}

let addDept = () => {};

module.exports = { viewAllDepts, addDept };
