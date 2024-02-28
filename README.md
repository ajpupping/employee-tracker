# Employee Tracker 

## Description 

The purpose of this project was to create a command-line application which will allow users to track and manage an employee database. User are able to view, add, and update information about the company's departments, roles, and employees. This application was built with Node.js. Inquirer is used to handle user prompts, and MySQL is used to store and manage data. 

## Installation 

To install this application, first clone the repository [found here](https://github.com/ajpupping/employee-tracker). Then open the repository and access the integrated terminal. 

Enter npm install into the command line to install the necessary dependencies. 

Then edit the .env-example file to include your username and password. Don't forget to remove "-example" from the file name!

Next log into your MySQL shell and run the command "source db/schema.sql;" to create the database. 

If you would like to test the application with existing data, you can run the command "source db/seeds.sql;" to populate the database. I used Star Trek characters, just for fun. 

Once these steps are complete, the application will be ready to use!

## Usage 

Enter "npm run start" into the integrated terminal to begin. 

Use the arrow and enter keys to make selections and follow the prompts. 

Select View Departments, View Roles, or View Employees to see tables displaying the relevant data. 

Select Add Department and follow the prompts to enter the name of a new department. 

Select Add Role and follow the prompts to enter the name of the role, then choose a department from the list, and add a salary. 

Select Add Employee and follow the prompts to enter the name of the employee, choose their role, and their manager from the list. Choosing a role will automatically update the database with the employee's department and salary. 

Select Update an Employee to change that employee's role by choosing a new role from the list. 


## Credits 

I used [this guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) to learn about using try, catch, and finally to handle errors. 

I used [this site](https://www.stanleyulili.com/node/node-modules-import-and-use-functions-from-another-file) to better understand how to import and export functions. 

## License 

This application was created for educational purposes and does not have a license. 
