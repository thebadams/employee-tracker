-- Insert Top-Level Employees
INSERT INTO employees(first_name, last_name, role_id)
VALUES("Meja", "Carideo", 12),
("Valary", "Abiodun", 9),
("Kristel", "Dumitru", 6),
("Idida", "Petersson", 13);

-- Insert Employees Who report to above employees
INSERT INTO employees(first_name,last_name, role_id, manager_id)
-- Reports to Director of HR (Manager ID 1)
VALUES("Sara", "Olayinka", 10, 1),
("Jovita", "Eads", 11, 1),
-- Reports to Director of Legal (Manager ID 2)
("Alastar", "Delgado", 7, 2),
("Marriane", "Quinlan", 7, 2),
-- Reports to Director of Sales (Manager ID 3)
("Dalibor", "Pereyra", 5, 3),
("Elaine", "Rigo", 5, 3),
-- Reports to Director of Engineering (Manager ID 4)
("Eustachio", "Juarez", 3, 4),
("Maxim", "Soto", 3, 4);

-- Insert Employees who report to above employees
INSERT INTO employees(first_name, last_name, role_id, manager_id)
-- reports to Project Manager Role ID 1 manager_id 11
VALUES("Leon", "David", 1, 11),
-- REPORTS to Project Manager Role ID 1, manager_id 12
("Jenny", "Myers", 1, 12),
-- Reports to SR Sale Manager, Role ID 5, manager_id 9
("Jela", "Albertsson", 5, 9),
-- Rrports to SR Sales Manager, Role ID , manager_id 10
("Ferdy", "Armando", 5, 10),
-- reports to SR Counsel role_id 8, manager_id 7
("Mercia", "Banister", 8, 7),
-- reports to RS counsel Role id 8, manager id 8
("Hari", "Collins", 8, 8);

-- Insert Employees who report to above employees
INSERT INTO employees(first_name, last_name, role_id, manager_id)
-- reports to SR Engineers, role_id 2 manager id 13
VALUES("Cyril", "Abasolo", 2, 13),
-- Reports to sr engineers, role id 2, manager id 14
("Luka", "MacAslan", 2, 14);