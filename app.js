const inquirer = require('inquirer');
const { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole, getManagers, getRoles, getEmployees } = require('./db/db.js');

// Main menu - prompt user for action

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
                    {
                        type: 'input',
                        name: 'roleDepartment',
                        message: 'Enter the name of the department this role belongs to:'
                    }
                    
                ]).then(({ roleTitle, roleSalary, roleDepartment }) => {
                    addRole(roleTitle, roleSalary, roleDepartment, promptUser);
                });
                break;
            case 'Add an employee':
                Promise.all([getRoles(), getManagers()]).then(([roleChoices, managerChoices]) => {
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'firstName',
                            message: 'Enter the first name of the new employee:'
                        },
                        {
                            type: 'input',
                            name: 'lastName',
                            message: 'Enter the last name of the new employee:'
                        },
                        {
                            type: 'list',
                            name: 'roleId',
                            message: 'Select a role for the new employee:',
                            choices: roleChoices
                        },
                        {
                            type: 'list',
                            name: 'managerId',
                            message: 'Select a manager for the new employee:',
                            choices: managerChoices
                        }
                    ]).then(({ firstName, lastName, roleId, managerId }) => {
                        addEmployee(firstName, lastName, roleId, managerId, promptUser);
                    });
                });
                break;
            case 'Update an employee role':
                Promise.all([getEmployees(), getRoles()]).then(([employeeChoices, roleChoices]) => {
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'employeeId',
                            message: 'Select an employee to update:',
                            choices: employeeChoices
                        },
                        {
                            type: 'list',
                            name: 'roleId',
                            message: 'Select a new role for the employee:',
                            choices: roleChoices
                        }
                    ]).then(({ employeeId, roleId }) => {
                        updateEmployeeRole(employeeId, roleId, promptUser);
                    });
                });
                break;
        }
    });
}

promptUser();