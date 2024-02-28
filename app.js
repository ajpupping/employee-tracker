const inquirer = require('inquirer');
const { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./db/db.js');

function promptUser() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role'
            ],
        }
    ]).then((answers) => {
        switch (answers.action) {
            case 'View all departments':
                viewDepartments(promptUser);
                break;
            case 'View all roles':
                viewRoles(promptUser);
                break;
            case 'View all employees':
                viewEmployees(promptUser);
                break;
            case 'Add a department':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'departmentName',
                        message: 'Enter the name of the department you would like to add:'
                    }
                ]).then(({ departmentName }) => {
                    addDepartment(departmentName, promptUser);
                });
                break;
            case 'Add a role':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'roleTitle',
                        message: 'Enter the title of the role you would like to add:'
                    },
                    {
                        type: 'input',
                        name: 'roleSalary',
                        message: 'Enter the salary of the role you would like to add:'
                    },
                ]).then(({ roleTitle, roleSalary, roleDepartment }) => {
                    addRole(roleTitle, roleSalary, roleDepartment, promptUser);
                });
                break;
            case 'Add an employee':
                addEmployee(promptUser);
                break;
            case 'Update an employee role':
                updateEmployeeRole(promptUser);
                break;
        }
    });
}

promptUser();