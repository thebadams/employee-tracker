const mysql = require('mysql');
const inquirer = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Bp@olo21992',
    database: 'company_db',
});


connection.connect((err)=>{
    if(err) throw err;
    console.log(`connected as id ${connection.threadId}`)
    // afterConnection();
})