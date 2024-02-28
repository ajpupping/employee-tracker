require('dotenv').config();

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}).promise();

async function viewDepartments(callback) {
    const [rows] = await connection.query('SELECT * FROM department');
    console.table(rows);
    callback();
}

async function viewRoles(callback) {
    const [rows] = await connection.query('SELECT * FROM role');
    console.table(rows);
    callback();
}

async function viewEmployees(callback) {
    const [rows] = await connection.query('SELECT * FROM employee');
    console.table(rows);
    callback();
}

async function addDepartment(callback) {
    const [department] = await connection.query('INSERT INTO department (name) VALUES (?)', [departmentName]);
    console.log(`${departmentName} has been added to the database`);
    callback();
}

async function addRole(callback) {
    const [role] = await connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [roleTitle, roleSalary, roleDepartment]);
    console.log(`${roleTitle} has been added to the database`);
    callback();
}

async function addEmployee(callback) {
    const [employee] = await connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [employeeFirstName, employeeLastName, employeeRole, employeeManager]);
    console.log(`${employeeFirstName} ${employeeLastName} has been added to the database`);
    callback();
}

async function updateEmployeeRole(callback) {
    const [employee] = await connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRole, employeeId]);
    console.log(`Employee role has been updated`);
    callback();
}

module.exports = { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole};