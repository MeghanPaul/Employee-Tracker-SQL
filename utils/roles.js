const { query, promise } = require('../db/connection');
const db = require('../db/connection');
const {getIdByDeptName} = require('./departments');

function viewAllRoles() {
    return Promise.resolve(
        db.promise().query('SELECT * FROM roles;')
    );
}

function getAllRoleNames() {
    const query = 'SELECT title FROM roles;';
    return Promise.resolve(
        db.promise().query(query)
        .then(([rows,fields]) => {
            return rows.map(role => role.title)
        })
    );
}

function getIdByRoleTitle(title) {
    const query = `SELECT id FROM roles WHERE title = '${title}';`;
    return Promise.resolve(
        db.promise().query(query)
        .then(([rows,fields]) => {
            const result = rows.map(role=>role.id);
            return result;
        })
    );
}

async function addRole(title, salary, dept) {
    dept = await getIdByDeptName(dept); 
    const query = `INSERT INTO roles (title,salary,department_id) VALUES ('${title}','${salary}','${dept}');`;
    return Promise.resolve(
        db.promise().query(query)
      );
}

module.exports = {viewAllRoles, getAllRoleNames, getIdByRoleTitle, addRole};