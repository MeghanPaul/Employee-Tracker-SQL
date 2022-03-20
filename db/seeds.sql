INSERT INTO departments
    (name)
VALUES
    ('Accounting'), 
    ('HR'),
    ('IT');

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('Role 1', 70000, 1),
    ('Role 2', 85000, 1),
    ('Role 3', 65000, 2),
    ('Role 4', 68000, 2),
    ('Role 5', 92000, 3),
    ('Role 6', 87000, 3);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Meghan', 'Paul', 1),
    ('Jon', 'Benzo', 2, 1),
    ('Morgan','Miranda',5,1);