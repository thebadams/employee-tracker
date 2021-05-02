const mysql = require('mysql');
// const inquirer = require('mysql');
// const cTable = require('console.table');

class Database {
	constructor(
		host = 'localhost',
		port = 3306,
		user = 'root',
		password = 'Bp@olo21992',
		database = 'company_db',
		tables = {
			employeeTable: 'employees',
			roleTable: 'roles',
			departmentTable: 'departments'
		}
	) {
		(this.host = host),
			(this.port = port),
			(this.user = user),
			(this.password = password),
			(this.database = database);
		this.tables = tables;
        this.connection = mysql.createConnection({
			host: this.host,
			port: this.port,
			user: this.user,
			password: this.password,
			database: this.database
		});
	}
	// database creation functions
	async connectToDB() {
		return this.connection.connect((err) => {
			if (err) throw err;
			console.log(`connected as id ${this.connection.threadId}`);
		});
	}
	async disconnectFromDB() {
		return this.connection.end();
	}
	// get information functions
	async getDepartmentsTable() {
        return this.connection.query(`SELECT * FROM departments`, (err, res)=>{
            if(err) throw err;
            return res
        })
    }
}

const database = new Database();
// database.createDBConnection();
// database.createDBConnection();
// database.connectToDB();
// database.getDepartmentsTable();
// database.disconnectFromDB();

// database.createDBConnection();
// // database.addNewDepartment('Administration');
// database.addNewRole('Secratary', 30000, 6);
// // database.addNewEmployee('George', 'Lopez', 14)
// database.disconnectFromDB();
// database.connectToDB();
//database.displayEmployeesTable();
// database.displayDepartmentsTable

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
	connection.query('SELECT * FROM employees', (err, res) => {
		if (err) throw err;
		console.table(res);
	});
};

const getDepartmentInfo = () => {
	connection.query('SELECT * FROM departments', (err, res) => {
		if (err) throw err;
		console.table(res);
	});
};

const getRoleInfo = () => {
	connection.query('SELECT * FROM roles', (err, res) => {
		if (err) throw err;
		console.table(res);
	});
};

const endConnection = () => {
	connection.end();
};
// connection.connect((err)=>{
//     if(err) throw err;
//     console.log(`connected as id ${connection.threadId}`)
//     getEmployeeInfo();
//     getDepartmentInfo();
//     getRoleInfo();
//     endConnection();
// })

module.exports = database;
