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
	}
	// database creation functions
	createDBConnection() {
		this.connection = mysql.createConnection({
			host: this.host,
			port: this.port,
			user: this.user,
			password: this.password,
			database: this.database
		});
	}
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
	async displayEmployeesTable() {
		//this.connectToDB();
		return this.connection.query(`SELECT * FROM ${this.tables.employeeTable}`, (err, res) => {
			if (err) throw err;
			console.table(res);
		});
	}
	async displayDepartmentsTable() {
		return this.connection.query(`SELECT * FROM ${this.tables.departmentTable}`, (err, res) => {
			if (err) throw err;
			console.table(res);
		});
	}
	async displayRolesTable() {
		return this.connection.query(`SELECT * FROM ${this.tables.roleTable}`, (err, res) => {
			if (err) throw err;
			console.table(res);
		});
	}

	// get tables raw information
	async getEmployeesTable() {
		//this.connectToDB();
		return this.connection.query(`SELECT * FROM ${this.tables.employeeTable}`, (err, res) => {
			if (err) throw err;
			return res;
		});
	}

	async getDepartmentsTable() {
		return this.connection.query(`SELECT * FROM ${this.tables.departmentTable}`, (err, res) => {
			if (err) throw err;
			return res;
		});
	}

	async getRolesTable() {
		return this.connection.query(`SELECT * FROM ${this.tables.roleTable}`, (err, res) => {
			if (err) throw err;
			return res;
		});
	}

	// insert new rows

	async addNewDepartment(departmentName) {
		return this.connection.query(
			`INSERT INTO ${this.tables.departmentTable}(name) VALUES('${departmentName}')`,
			(err, res) => {
				if (err) throw err;
				console.log('Successfully Added');
			}
		);
	}

	async addNewRole(roleTitle, salary, department_id) {
		return this.connection.query(
			`INSERT INTO ${this.tables
				.roleTable}(title, salary, department_id) VALUES('${roleTitle}', ${salary}, ${department_id})`,
			(err, res) => {
				if (err) throw err;
				console.log('Successfully Added');
			}
		);
	}

	async addNewEmployee(first_name, last_name, role_id, manager_id) {
		return this.connection.query(
			`INSERT INTO ${this.tables
				.employeeTable} VALUES('${first_name}', '${last_name}', ${role_id}, ${manager_id})`,
			(err, res) => {
				if (err) throw err;
				console.log('Success');
			}
		);
	}
	async updateEmployee(firstName, lastName, roleID, managerID, whereClause) {
		return this.connection.query(
			`UPDATE ${this.tables
				.employeeTable} SET  first_name = '${firstName}', last_name = '${lastName}', role_id =${roleID}, manager_id=${managerID} WHERE ?`,
			whereClause,
			(err, res) => {
				if (err) throw err;
				console.log('Successfully Updated');
			}
		);
	}
	async updateRole(title, department_id, salary, whereClause) {
		return this.connection.query(
			`UPDATE ${this.tables
				.roleTable} SET title='${title}', salary=${salary}, department_id=${department_id} WHERE ?`,
			whereClause,
			(err, res) => {
				if (err) throw err;
				console.log('Successfully Updated');
			}
		);
	}

	async updateDepartment(name, whereClause) {
		return this.connection.query(
			`UPDATE ${this.tables.departmentTable} SET name='${name} WHERE ?`,
			whereClause,
			(err, res) => {
				if (err) throw err;
				console.log('Successfully Updated');
			}
		);
	}
}

const database = new Database();
// database.createDBConnection();
// database.createDBConnection();
// database.getDepartmentsTable()

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
