require('dotenv').config();

const mysql = require('mysql2');
const connection = mysql
    .createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    })
    .promise();


// View Departments 

async function viewDepartments(callback) {
    try {
        const [rows] = await connection.query('SELECT * FROM departments');
        console.table(rows);
    } catch (err) {
        console.log(err);
    } finally {
        callback();
    }
}

// View Roles

async function viewRoles(callback) {
    // Display roles with department name instead of department id
    const query = `
    SELECT 
        roles.id AS 'Role ID',
        roles.title AS 'Title',
        department.name AS 'Department',
        roles.salary AS 'Salary'
    FROM roles
    JOIN department ON roles.department_id = department.id;
`;
    try {
        const [rows] = await connection.query(query);
        console.table(rows);
    } catch (err) {
        console.log(err);
    } finally {
        callback();
    }
}

// View Employees

async function viewEmployees(callback) {
    // Display employee names, job titles, departments, salaries, and managers

    const query = 
        `SELECT 
            employees.id AS 'Employee ID',
            employees.first_name AS 'First Name',
            employees.last_name AS 'Last Name',
            roles.title AS 'Job Title',
            departments.name AS 'Department',
            roles.salary AS 'Salary',
            CONCAT(managers.first_name, ' ', managers.last_name) AS 'Manager'
        FROM employees
        JOIN roles ON employees.role_id = roles.id
        JOIN departments ON roles.department_id = department.id
        LEFT JOIN employees managers ON employees.manager_id = managers.id;`;
    try {
        const [rows] = await connection.query(query);
        console.table(rows);
    } catch (err) {
        console.log(err);
    } finally {
        callback();
    }
}

// Add Department

async function addDepartment(departmentName, callback) {
    try {
        // Check if department already exists
        const [departments] = await connection.query('SELECT name FROM departments WHERE name = ?', [departmentName]);

        if (departments.length > 0) {
            console.log(`${departmentName} already exists in the database`);
        } else {
            // Add the new department
            await connection.query(
                'INSERT INTO departments (name) VALUES (?)',
                [departmentName]
            );
            console.log(`${departmentName} has been added to the database`);
        }
    } catch (err) {
        console.log(err);
    } 
    finally {
        callback();
    }
}


// Add Role

async function addRole(roleTitle, roleSalary, roleDepartment, callback) {
    try {
        // Fetch department id from department name
        const [departments] = await connection.query('SELECT id FROM departments WHERE name = ?', [roleDepartment]);
        // Check if department exists
        if (departments.length === 0) {
            console.log('Department not found');
            return callback();
        }
        // Use the first matching department id
        const departmentId = departments[0].id;

        // Add the new role with the department id
        await connection.query(
            'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
            [roleTitle, roleSalary, departmentId]
        );
        console.log(`${roleTitle} has been added to the database`);
    } catch (err) {
        console.log(err);
    } finally {
        callback();
    }
}

// Add Employee

async function addEmployee(callback) {
    const [employee] = await connection.query(
        'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [employeeFirstName, employeeLastName, employeeRole, employeeManager]
    );
    console.log(
        `${employeeFirstName} ${employeeLastName} has been added to the database`
    );
    callback();
}

async function updateEmployeeRole(callback) {
    const [employee] = await connection.query(
        'UPDATE employees SET role_id = ? WHERE id = ?',
        [newRole, employeeId]
    );
    console.log(`Employee role has been updated`);
    callback();
}

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
};
