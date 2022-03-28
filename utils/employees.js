const db = require('../db/connection');

function viewAllEmployees() {
    return Promise.resolve(
        db.promise().query('SELECT * FROM employees')
    );
}

module.exports = {viewAllEmployees};