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
        departments.name AS 'Department',
        roles.salary AS 'Salary'
    FROM roles
    JOIN departments ON roles.department_id = departments.id;
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
        JOIN departments ON roles.department_id = departments.id
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

async function addEmployee(firstName, lastName, roleId, managerId, callback) {
    try {
        await connection.query(
            'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
            [firstName, lastName, roleId, managerId]
        );
        console.log(`${firstName} ${lastName} has been added to the database`);
    } catch (err) {
        console.log(err);
    } finally {
        callback();
    }
}

// Update Employee Role

async function updateEmployeeRole(employeeId, roleId, callback) {
    try {
        await connection.query(
            'UPDATE employees SET role_id = ? WHERE id = ?',
            [roleId, employeeId]
        );
        console.log(`Employee role has been updated`);
    } catch (err) {
        console.log(err);
    } finally {
        callback();
    }

}

// helper function to fetch manager data
async function getManagers() {
    try {
        const [managers] = await connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees WHERE manager_id IS NULL OR manager_id != ""');
        const managerChoices = managers.map(manager => ({name: manager.name, value: manager.id}));
        managerChoices.unshift({name: 'None', value: null});
        return managerChoices;
    } catch (err) {
        console.log(err);
        return [{name: 'None', value: null}];
    }
}

// helper function to fetch role data

async function getRoles() {
    try {
        const [roles] = await connection.query('SELECT id, title FROM roles');
        const roleChoices = roles.map(role => ({name: role.title, value: role.id}));
        return roleChoices;
    } catch (err) {
        console.log(err);
        return [];
    }

}

// helper function to fetch employee data
async function getEmployees() {
    try {
        const [employees] = await connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees');
        const employeeChoices = employees.map(employee => ({name: employee.name, value: employee.id}));
        return employeeChoices;
    } catch (err) {
        console.log(err);
        return [];
    }
}

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    getManagers,
    getRoles,
    getEmployees
};
