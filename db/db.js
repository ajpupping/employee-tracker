require('dotenv').config();

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}).promise();

async function viewDepartments() {
    const [rows] = await connection.query('SELECT * FROM department');
    console.table(rows);
}

async function viewRoles() {
    const [rows] = await connection.query('SELECT * FROM role');
    console.table(rows);
}

async function viewEmployees() {
    const [rows] = await connection.query('SELECT * FROM employee');
    console.table(rows);
}

async function addDepartment() {
    const [department] = await connection.query('INSERT INTO department (name) VALUES (?)', [departmentName]);
    console.log(`${departmentName} has been added to the database`);
}

async function addRole() {
    const [role] = await connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [roleTitle, roleSalary, roleDepartment]);
    console.log(`${roleTitle} has been added to the database`);
}

async function addEmployee() {
    const [employee] = await connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [employeeFirstName, employeeLastName, employeeRole, employeeManager]);
    console.log(`${employeeFirstName} ${employeeLastName} has been added to the database`);
}

async function updateEmployeeRole() {
    const [employee] = await connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRole, employeeId]);
    console.log(`Employee role has been updated`);
}

module.exports = { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole};