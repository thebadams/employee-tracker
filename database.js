const mysql = require('mysql');
const inquirer = require('mysql');
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Bp@olo21992',
    database: 'company_db',
});



// function to select all employees
const getEmployeeInfo = () => {
    connection.query("SELECT * FROM employees", (err, res)=>{
        if(err) throw err;
        console.table(res);
    })
}

const getDepartmentInfo = () => {
    connection.query("SELECT * FROM departments", (err, res)=>{
        if(err) throw err;
        console.table(res);
    })
}

const getRoleInfo = () => {
    connection.query('SELECT * FROM roles', (err, res)=>{
        if(err) throw err;
        console.table(res);
    })
}

const endConnection = () =>{
    connection.end();
}
connection.connect((err)=>{
    if(err) throw err;
    console.log(`connected as id ${connection.threadId}`)
    getEmployeeInfo();
    getDepartmentInfo();
    getRoleInfo();
    endConnection();
})