USE employee_db;

INSERT INTO departments (name) VALUES 
('Command'),
('Engineering'), 
('Science');

INSERT INTO roles (title, department_id, salary) VALUES 
('Captain', 1, 100000),
('Commander', 1, 90000),
('Engineer', 2, 80000),
('Scientist', 3, 750000);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
('Jean-Luc', 'Picard', 1, NULL), 
('William', 'Riker', 2, 1),
('Deanna', 'Troi', 4, 1),
('Geordi', 'La Forge', 3, 1),
('Miles', 'O''Brien', 3, 4),
('Beverly', 'Crusher', 4, 1),
('Worf', 'Son of Mogh', 2, 2),
('Data', 'Soong', 4, 1);
