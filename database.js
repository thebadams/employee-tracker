const mysql = require('mysql2/promise');
const cTable = require("console.table")
// const inquirer = require('mysql');
// const cTable = require('console.table');
class Database {
	constructor() {
		this.config = {
			host: "localhost",
			port: 3306,
			user: "root",
			password: "Bp@olo21992",
			database: "company_db"
		}
	}
	async selectEmployeeTable(){
		const {config} = this;
		const connection = await mysql.createConnection(config);
		const [rows, schema] = await connection.query("SELECT * FROM employees");
		console.table(rows);
	}

	async selectRoleTable(){
		const {config} = this;
		const connection = await mysql.createConnection(config);
		const [rows, schema] = await connection.query("SELECT * FROM roles");
		console.table(rows);
	}

	async selectDepartmentTable () {
		const {config} = this;
		const connection = await mysql.createConnection(config);
		const [rows, schema] = await connection.query("SELECT * FROM departments");
		console.table(rows);
	}

	async addNewDept(deptName) {
		const {config}= this;
		const connection = await mysql.createConnection(config);
		try {
			const results = await connection.query("INSERT INTO departments(name) VALUES(?)", [deptName])
			console.log(results)

		} catch (error) {
			console.error(error);
		}
		

	}
}

const database = new Database();
database.addNewDept("IT")
// database.selectEmployeeTable();
// database.selectRoleTable();
// database.selectDepartmentTable();
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
// database.connectToDB()
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
// const getEmployeeInfo = () => {
// 	connection.query('SELECT * FROM employees', (err, res) => {
// 		if (err) throw err;
// 		console.table(res);
// 	});
// };

// const getDepartmentInfo = () => {
// 	connection.query('SELECT * FROM departments', (err, res) => {
// 		if (err) throw err;
// 		console.table(res);
// 	});
// };

// const getRoleInfo = () => {
// 	connection.query('SELECT * FROM roles', (err, res) => {
// 		if (err) throw err;
// 		console.table(res);
// 	});
// };

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
