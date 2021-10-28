// get the client
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "JPablo#21",
  database: "employeesDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected");
  start();
});

// prompst user what they would like to do
function start() {
  inquirer
    .prompt({
      name: "initialQuestion",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "VIEW DEPARTMENT",
        "VIEW EMPLOYEE",
        "VIEW ROLES",
        "ADD DEPARTMENT",
        "ADD EMPLOYEES",
        "ADD ROLE",
        "UPDATE EMPLOYEE ROLE",
        "EXIT",
      ],
    })
    .then(function (answer) {
      // function called based on user input
      if (answer.initialQuestion === "VIEW DEPARTMENT") {
        viewDepartment();
      } else if (answer.initialQuestion === "VIEW EMPLOYEE") {
        viewEmployee();
      } else if (answer.initialQuestion === "VIEW ROLES") {
        viewRoles();
      } else if (answer.initialQuestion === "ADD DEPARTMENT") {
        addDepartment();
      } else if (answer.initialQuestion === "ADD EMPLOYEES") {
        addEmployees();
      } else if (answer.initialQuestion === "ADD ROLE") {
        addRole();
      } else if (answer.initialQuestion === "UPDATE EMPLOYEE ROLE") {
        updateRoles();
      } else {
        connection.end();
      }
    });
}

// View Department
function viewDepartment() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.log("Departments List");
    console.table(res);
    start();
  });
}

// View Employee
function viewEmployee() {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// View Roles
function viewRoles() {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.log(`List of Roles`);
    console.table(res);
    start();
  });
}
// Update Role
function updateRoles() {
  const sql = "select * from Employee";
  const sql2 = "select * from role";

  connection.query(sql, function (err, emps) {
    connection.query(sql2, function (err, roles) {
      inquirer
        .prompt([
          {
            name: "Employee",
            type: "rawlist",
            choices: () => {
              let choices = [];
              for (let i = 0; i < emps.length; i++) {
                choices.push(emps[i].first_name + " " + emps[i].last_name);
              }
              return choices;
            },
            message: "Choose Employee you would like to update",
          },
          {
            name: "newRole",
            type: "rawlist",
            choices: () => {
              let choices = [];
              for (let i = 0; i < roles.length; i++) {
                choices.push(roles[i].title);
              }
              return choices;
            },
            message: "Choose employee's new role",
          },
        ])
        .then(function (answer) {
          connection.query("Update Employee SET ? where ?", [
            {
              role_id: roles.find((x) => x.title == answer.newRole).id,
            },
            {
              id: emps.find(
                (x) => x.first_name + " " + x.last_name == answer.Employee
              ).id,
            },
          ]);
          console.table(answer);
          start();
        });
    });
  });
}

// Add Department
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "addDepartment",
        type: "input",
        message: "Enter Department Name",
      },
    ])
    .then(function (answer) {
      connection.query("INSERT INTO department SET ?", {
        name: answer.addDepartment,
      });
      console.table(answer);
      start();
    });
}

// Add Employees
function addEmployees() {
  connection.query("select * from role", function (err, roles) {
    inquirer
      .prompt([
        {
          name: "EmployeeFirstName",
          type: "input",
          message: "Insert The Employee's First Name",
        },
        {
          name: "EmployeeLastName",
          type: "input",
          message: "Insert The Employee's Last Name",
        },
        {
          name: "EmployeeRoleName",
          type: "rawlist",
          choices: () => {
            let choice = [];
            for (let i = 0; i < roles.length; i++) {
              choice.push(roles[i].title);
            }
            return choice;
          },
          message: "Insert The Employee's Role",
        },
        {
          name: "EmployeeManagerId",
          type: "input",
          message: "Insert Manager Id",
          validation: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          },
        },
      ])
      .then(function (answer) {
        connection.query("INSERT INTO employee SET ?", {
          first_name: answer.EmployeeFirstName,
          last_name: answer.EmployeeLastName,
          role_id: roles.find((x) => x.title == answer.EmployeeRoleName).id,
          manager_id: answer.EmployeeManagerId,
        });
        console.table(answer);
        start();
      });
  });
}

// Add role
function addRole() {
  // const sql = "select * from department";
  connection.query("select * from department", function (err, depts) {
    inquirer
      .prompt([
        {
          name: "addRoleTitle",
          type: "input",
          message: "What is the employee's role?",
        },
        {
          name: "addRoleSalary",
          type: "input",
          message: "What is the salary of the role?",
        },
        {
          name: "departmentId",
          type: "rawlist",
          choices: function () {
            let choices = [];
            for (let i = 0; i < depts.length; i++) {
              choices.push(depts[i].name);
            }
            return choices;
          },
          message: "Which department does the role belong to?",
        },
      ])
      .then(function (answer) {
        connection.query("INSERT INTO role SET ?", {
          title: answer.addRoleTitle,
          salary: answer.addRoleSalary,
          department_id: depts.find((x) => x.name == answer.departmentId).id,
        });
        console.table(answer);
        start();
      });
  });
}
