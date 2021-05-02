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
                console.log("I Wish to Add A Role");
                break;
            case "Add Employee":
                console.log("I Would Like To Add An Employee");
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
}

const app = new Application()

app.startMenu().then(userChoice=>app.checkUserChoice(userChoice))