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
		return rows;
	}

	async selectRoleTable(){
		const {config} = this;
		const connection = await mysql.createConnection(config);
		const [rows, schema] = await connection.query("SELECT * FROM roles");
		return rows
	}

	async selectDepartmentTable () {
		const {config} = this;
		const connection = await mysql.createConnection(config);
		const [rows, schema] = await connection.query("SELECT * FROM departments");
		return rows
	}
	
	async selectManagers(){
		const {config} = this;
		const connection = await mysql.createConnection(config);
		const [rows, schema] = await connection.query("SELECT CONCAT(first_name, ' ', last_name) as name, id FROM employees WHERE id in (SELECT DISTINCT manager_id from employees)")
		return rows
	}

	async addNewDept(deptName) {
		const {config}= this;
		const connection = await mysql.createConnection(config);
		try {
			const results = await connection.query("INSERT INTO departments(name) VALUES(?)", [deptName])
			return results[0]

		} catch (error) {
			console.error(error);
		}
		

	}

	async addNewRole(roleInfo){
		const {config} = this;
		const connection = await mysql.createConnection(config)
		try {
			const results = await connection.query("INSERT INTO roles(title, department_id, salary) VALUES(?, ?, ?)", [roleInfo.roleTitle, roleInfo.roleDept, roleInfo.roleSalary])
			return results[0]
		} catch (error) {
			console.error(error)
		}
	}

	async addNewEmployee(employeeInfo){
		const {config} = this;
		const connection = await mysql.createConnection(config);
		try {
			const results = await connection.query("INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)", [employeeInfo.empFirstName, employeeInfo.empLastName, employeeInfo.empRole, employeeInfo.empMgr])
			return  "Successfully Added New Employee"
		} catch (error) {
			console.error(error)
		}
	}

	async updateEmployeeRole(employeeInfo) {
		const {config} = this;
		const connection = await mysql.createConnection(config);
		try {
			const results = await connection.query("UPDATE employees SET role_id = ? WHERE id= ?", [employeeInfo.updatedEmpRole, employeeInfo.updatedEmployee])
			return results
		} catch (error) {
			
		}
	}
}

const database = new Database();

// database.addNewDept("IT")
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
