const inquirer = require('inquirer');
const database = require('./database')


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
            gatherRoleInfo();
            break;
        case "Add Employee":
            gatherEmployeeInfo();
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
// database.displayDepartmentsTable()
const generateDepartmentList = async () =>{
    database.createDBConnection()
    console.log("generation started")
    const deptTable = await database.getDepartmentsTable()
    console.log(deptTable);
}

const gatherRoleInfo = async ()=>{
    const roleInfo = await inquirer.prompt([
        {
        type: "list",
        choices: ["Department 1", "Department 2", "Department 3", "Department 4"],
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

const gatherEmployeeInfo = async ()=>{
    const employeeInfo = await inquirer.prompt([
        {
           type: "list",
           choices: ["Role 1", "Role 2", "Role 3", "Role 4"],
           name: "employeeRole",
           message: "Please Choose and Employee Role"
        },
        {
            type: "input",
            message: "Please give the Employee's First Name",
            name: "employeeFirstName",
        },
        {
            type: "input",
            message: "Please give the employee's last name",
            name: "employeeLastName"
        },
        {
            type: "list",
            choices: ["Manager 1", "Manager 2", "Manager 3", "No Manager"],
            name: "employeeManager"
        }
    ])
    employeeInfo.employeeFirstName = employeeInfo.employeeFirstName.trim();
    employeeInfo.employeeLastName = employeeInfo.employeeLastName.trim();
    if(employeeInfo.employeeManager==="No Manager"){
        employeeInfo.employeeManager = null;
    }
    console.log(employeeInfo)
}

const init = async () => {
    const userChoice = await startApp();
    const checkMenuChoice = await checkUserChoice(userChoice);
    return checkMenuChoice;
}

// init()
generateDepartmentList()