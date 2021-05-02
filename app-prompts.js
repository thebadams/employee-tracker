const inquirer = require('inquirer');
const mysql = require('mysql')
const database = require('./database')

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'Bp@olo21992',
  database: 'company_db',
});

connection.connect((err)=>{
    if(err) throw err;
    console.log(`connected as id ${connection.threadId}`)
})


const startApp = async () => {
    const  startMenu = await inquirer.prompt({
        type: "list",
        name: "startMenuChoice",
        choices: ["Add Department", "Add Role", "Add Employee"],
        message: "Please Choose What You Would Like To Do."
    })
    const userChoice = startMenu.startMenuChoice;

    return userChoice
}

const checkUserChoice = async (userChoice) =>{
    switch(userChoice){
        case "Add Department":
            gatherDepartmentInfo();
            break;
        case "Add Role":
            generateDepartmentList();
            break;
        case "Add Employee":
            gatherEmployeeInfo()
            break;
        default:
            console.log("Nothing Chosen");
    }
}

const gatherDepartmentInfo = async ()=>{
    const deptInfo = await inquirer.prompt({
        type: "input",
        name: "deptName",
        message: "Please input the new department's name."
    })
    const deptName = deptInfo.deptName;
    console.log(deptName[0]);
}

const generateDepartmentList = ()=>{
    connection.query("SELECT * FROM departments", (err, res)=>{
        if (err) throw err;
        // console.log(res);
        const deptList = res.map((el)=>{
            return {
                name: el.name,
                value: el.id
            }
        })
       gatherRoleInfo(deptList)
       connection.end();
    })
    
}

// generateDepartmentList();
// database.displayDepartmentsTable()
// const generateDepartmentsList =  ()=>{
//     deptTable =  database.getDepartmentsTable()
//     console.log();
    
//     // database.disconnectFromDB();
// }
const gatherRoleInfo = async (deptList)=>{
    const roleInfo = await inquirer.prompt([
        {
        type: "list",
        choices: deptList,
        message: "Please Choose Which Department To Add this Role Into",
        name: "roleDept"
        },
        {
            type: "input",
            message: "Please give a name for the new role.",
            name: "roleTitle"
        },
        {
            type: "input",
            message:"Please give a salary for the new role",
            name: "roleSalary"
        }
    ])
    roleInfo.roleSalary = parseInt(roleInfo.roleSalary)
    roleInfo.roleTitle = roleInfo.roleTitle.trim()

    console.log(roleInfo);
}


const generateRoleList = async () => {
    connection.query("SELECT * FROM roles", (err, res)=>{
        if(err) throw err;
        let roleList = res.map((el)=>{
            return {
                name: el.title,
                value: el.id
            }
        })
        gatherEmployeeRole(roleList);
        connection.end()
    })
}

const generateManagerList = async () => {
    connection.query("SELECT CONCAT(first_name, ' ', last_name) as name, id FROM employees WHERE id in (SELECT DISTINCT manager_id from employees)", (err,res)=>{
        if(err) throw err;
        let managerList = res.map((el)=>{
            return {
                name: el.name,
                value: el.id
            }
        })
        gatherEmployeeRole(managerList)
    })
}

const gatherEmployeeRole = async (roleList)=>{
    const employeeRole = await inquirer.prompt({
        type: "list",
        choices: roleList,
        message: "Please Choose the Employee's Role",
        name: "employeeRole"
    })
    return employeeRole;
}

const gatherEmployeeManager = async (managerList)=>{
    const employeeManager =  await inquirer.prompt({
        type: "list",
        choices: managerList,
        name: "employeeManager",
        message: "Please Choose the Employee's Manager"
    })
    return employeeManager;
}
const gatherEmployeeInfo = async ()=>{
    const employeeRole = await generateRoleList()
    const employeeManager = await generateManagerList()
    const employeeInfo = await inquirer.prompt([
        {
            type: "input",
            message:"Please Give the Employee's First Name",
            name: "employeeFirstName"
        },
        {
            type: "input",
            message: "Please Give the Employee's Last Name",
            name: "employeeLastName"
        }
    ])
    employeeInfo.employeeFirstName = employeeInfo.employeeFirstName.trim();
    employeeInfo.employeeLastName = employeeInfo.employeeLastName.trim();
    if(employeeInfo.employeeManager==="No Manager"){
        employeeInfo.employeeManager = null;
    }
    console.log(employeeInfo, employeeRole, employeeManager);
}

const init = async () => {
    const userChoice = await startApp();
    const checkMenuChoice = await checkUserChoice(userChoice);
    return checkMenuChoice;
}

init()
// generateDepartmentList()
// console.log(database)
// database.createDBConnection();
// const departmentsTable = database.getDepartmentsTable();
// console.log(departmentsTable)
// // database.getDepartmentsTable();
// database.disconnectFromDB();