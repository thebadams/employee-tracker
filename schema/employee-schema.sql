CREATE TABLE employees(
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id)
    -- FOREIGN KEY(role_id) REFERENCES roles(id),
    -- FOREIGN KEY(manager_id) REFERENCES employees(id)
);

ALTER TABLE employees
ADD FOREIGN KEY(role_id) REFERENCES roles(id)
ON DELETE CASCADE
ON UPDATE CASCADE;
