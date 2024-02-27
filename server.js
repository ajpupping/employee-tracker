const inquirer = require('inquirer');
const { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./db');


// TODO: view all departments, view all roles, view all employees, adda a department, add a role, add an employee, update an employee role 
// view departments should show a table with department names and ids
// view roles should show a table with job title, role id, department role belongs to, and salaries
// view employees should show a table with employee id, first name, last name, job title, department, salaries, and manager that employee reports to
// add department should prompt user to enter the name of the department and then add that department to the database
// add role should prompt user to enter the name, salary, and department for the role and then add that role to the database
// add employee should prompt user to enter the employee's first name, last name, role, and manager and then add that employee to the database
// update employee role should prompt user to select an employee to update and their new role and then it should update the employee's role in the database

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
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
        }
    });
}

promptUser();