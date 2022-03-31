const { query } = require('../db/connection');
const db = require('../db/connection');

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

module.exports = {viewAllRoles, getAllRoleNames, getIdByRoleTitle};