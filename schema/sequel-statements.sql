-- Insert Statements:
-- Statement to insert a new department:
INSERT INTO departments(name)
VALUE(<namehere>);

-- Statement to insert a new role
INSERT INTO roles(title, salary, department_id)
VALUES(<title>, <salary>, <department_id>);

-- Statement to insert a new employee
INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES (<first_name>, <last_name>, <role_id>, <manager_id>);

