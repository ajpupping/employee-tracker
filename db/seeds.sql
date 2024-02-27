-- seeds.sql

USE employee_db;

INSERT INTO department (name) VALUES ('Engineering'), ('Science'), ('Command');

INSERT INTO role (title, salary, department_id) VALUES 
('Commander', 100000, 1),
('Engineer', 90000, 2),
('Scientist', 80000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Jean-Luc', 'Picard', 1, 1), 
('Geordi', 'La Forge', 2 , NULL),
('Deanna', 'Troi', 3, NULL),
('William', 'Riker', 1, NULL),
('Beverly', 'Crusher', 3, NULL),
('Worf', 'Son of Mogh', 1, NULL),
('Data', 'Soong', 3, NULL),
('Miles', 'O''Brien', 2, NULL);
