const inquirer = require("inquirer");
const database = require("./database")

class Application{
    constructor(){

    }
    async startMenu(){
        const start =  await inquirer.prompt({
            type: "list",
            name: "startMenuChoice",
            choices: ["Add Department", "Add Role", "Add Employee"],
            message: "Please Select What Action You Would Like To Take"
        })
        const userChoice = start.startMenuChoice
       return userChoice
    }

    async checkUserChoice(userChoice){
        switch(userChoice) {
            case  "Add Department":
               this.gatherDepartmentInfo();
                break;
            case "Add Role":
                this.gatherRoleInfo();
                break;
            case "Add Employee":
                this.gatherEmployeeInfo()
                break;
            default:
                "Nothing Chosen"
        }
    }
    
    async gatherDepartmentInfo() {
        const userInput = await inquirer.prompt({
            type: "input",
            message: "Please Enter The New Department's Name",
            name: "deptName"
        })

        const {deptName} = userInput
        const results = await database.addNewDept(deptName);
        console.log(results)

    }

    async generateDepartmentList(){
        const deptTable = await database.selectDepartmentTable()
        const deptList = deptTable.map((deptRow)=>{
            return {
                name: deptRow.name,
                value: deptRow.id
            }
        })
        return deptList
    }
    async gatherRoleInfo(){
        const deptList = await this.generateDepartmentList()
        const userInput = await inquirer.prompt([
            {
                type: "list",
                message: "Please Choose Which Department To Add the Role To",
                name: "roleDept",
                choices: deptList
            },
            {
                type: "input",
               message: "Please Input the Role Title",
               name: "roleTitle" 
            },
            {
                type: "input",
                message: "Please Input the Role's Salary",
                name: "roleSalary"
            }
        ])
        const results = await database.addNewRole(userInput)
        console.log(results)

        
    }

    async generateRoleList(){
        const roleTable = await database.selectRoleTable();
        const roleList = roleTable.map((role)=>{
            return {
                name: role.title,
                value: role.id
            }
        })
       return roleList;
    }

    async generateManagerList() {
        const managerView = await database.selectManagers();
        const managerList = managerView.map((manager)=>{
            return {
                name: manager.name,
                value: manager.id
            }
        })
        return managerList;
    }

    async gatherEmployeeInfo(){
        const managerList = await this.generateManagerList()
        const roleList = await this.generateRoleList()
        const userInput = await inquirer.prompt([
            {
                type: "input",
                message: "Please Input the New Employee's First Name",
                name: "empFirstName"
            },
            {
                type: "input",
                message: "Please Input the New Employee's Last Name",
                name: "empLastName"
            },
            {
                type: "list",
                message: "Please Choose the new Employee's Role",
                name: "empRole",
                choices: roleList
            },
            {
                type: "list",
                message: "Please Choose the new Employee's Manager",
                name: "empMgr",
                choices: [...managerList, {name:"No Manager", value: null}]
            }
        ])
       const results = await database.addNewEmployee(userInput);
       console.log(results);
    }
}

const app = new Application()

// app.startMenu().then(userChoice=>app.checkUserChoice(userChoice))

app.gatherEmployeeInfo();
