const inquirer = require('inquirer');
const database = require('./database')


const startApp= async ()=> {
        return inquirer.prompt({
            type: 'list',
            message: 'What Would You Like To Do',
            name: 'startMenu',
            choices: ['View Employee Table', 'View Roles Table', 'View Departments Table']
        }).then((data)=>data.startMenu)

    }

        

const checkMenuInput = async (input) =>{
    switch(input){
        case 'View Employee Table':
            database.displayEmployeesTable();
            break;
        case 'View Roles Table':
            database.displayRolesTable();
            break;
        case 'View Departments Table':
            database.displayDepartmentsTable();

    }
}

const init = () =>{
    database.createDBConnection();
    startApp().then((input)=>checkMenuInput(input)).then(()=>database.disconnectFromDB());
}

init()