const mysql = require('mysql');
const inquirer = require('mysql');
const cTable = require("console.table");


class Database{
    constructor(host = 'localhost', port = 3306, user = 'root', password = 'Bp@olo21992', database = 'company_db', tables = {
        employeeTable : 'employees',
        roleTable : 'roles',
        departmentTable : 'departments'
    }){
        this.host = host,
        this.port = port,
        this.user = user,
        this.password = password,
        this.database = database
        this.tables = tables
    }
    // database creation functions
    createDBConnection(){
        this.connection = mysql.createConnection({
            host: this.host,
            port: this.port,
            user: this.user,
            password: this.password,
            database: this.database
        })
    }
    connectToDB(){
        this.connection.connect((err)=>{
    if(err) throw err;
    console.log(`connected as id ${this.connection.threadId}`)
    });
    }
    disconnectFromDB(){
        this.connection.end();
    }
    // get information functions
    displayEmployeesTable(){
        this.connection.query(`SELECT * FROM ${this.tables.employeeTable}`, (err, res)=>{
            if(err) throw err;
            console.table(res);
        })
    }
    displayDepartmentsTable(){
        this.connection.query(`SELECT * FROM ${this.tables.departmentTable}`, (err, res)=>{
            if(err) throw err;
            console.table(res);
        })
    }
    displayRolesTable(){
        this.connection.query(`SELECT * FROM ${this.tables.roleTable}`, (err,res)=>{
            if(err) throw err;
            console.table(res);
        })
    }
}

const database = new Database()

// database.createDBConnection();
// database.connectToDB();
// database.displayEmployeesTable();
// database.displayDepartmentsTable();
// database.displayRolesTable();
// database.disconnectFromDB();
// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: 'Bp@olo21992',
//     database: 'company_db',
// });



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
// connection.connect((err)=>{
//     if(err) throw err;
//     console.log(`connected as id ${connection.threadId}`)
//     getEmployeeInfo();
//     getDepartmentInfo();
//     getRoleInfo();
//     endConnection();
// })

module.exports = database;