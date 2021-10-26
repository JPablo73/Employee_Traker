USE employeesDB;

INSERT INTO department (name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Sales Lead", 80000, 1),
    ("Lead Engineer", 150000, 2),
    ("Accountant", 125000, 3),3
    ("Software Engineer", 120000, 2),
    ("Legal", 250000, 4)
    

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Doe", 1, 3),
    ("Mike", "Chan", 2, 1),
    ("Ashley", "Rodriguez", 3, NULL),
    ("Kevin", "Tupik", 4, 3),
    ("Malia", "Brown", 5, NULL),
    ("Sarah", "Lourd", 2, NULL),
    ("Tom", "Allen", 4, 7);
