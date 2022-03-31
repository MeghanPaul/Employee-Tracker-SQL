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

function getAllDeptNames() {
  const query = 'SELECT name FROM departments;';
    return Promise.resolve(
        db.promise().query(query)
        .then(([rows,fields]) => {
            return rows.map(dept => dept.name);
        })
    );
}

function getIdByDeptName(name) {
  const query = `SELECT id FROM departments WHERE name = '${name}';`;
    return Promise.resolve(
        db.promise().query(query)
        .then(([rows,fields]) => {
            const result = rows.map(dept=>dept.id);
            return result;
        })
    );
}

module.exports = { viewAllDepts, addDept, getAllDeptNames, getIdByDeptName };
