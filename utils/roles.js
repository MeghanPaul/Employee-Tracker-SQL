const db = require('../db/connection');

function viewAllRoles() {
    return Promise.resolve(
        db.promise().query('SELECT * FROM roles')
    );
}

module.exports = {viewAllRoles};