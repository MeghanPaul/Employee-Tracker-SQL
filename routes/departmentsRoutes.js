const db = require('../db/connection');

function listAllDepts() {
    db.query('SELECT * FROM departments',(err, result) => {
        if(err){
            return err;
        }else{
            console.table(result);
        }
    })
}

module.exports = deptRoutes;