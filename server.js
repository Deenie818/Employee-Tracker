const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTables = require("console.table");
const { allowedNodeEnvironmentFlags } = require("process");
var managers = [];
var roles = [];
var employees = [];

const connection = mysql.createConnection({
    host: "localhost",
    port: 3301,
    user: "root",
    password: "Lolajake2008!",
    database: "employeesDB",
});

const getManager = () => {
    connection.query(`SELECT manager, manager_id FROM managers`, (err,res) => {
        if (err) throw err;
        managers = [];
        for (let i = 0; i <res.length; i++) {
            const manager = res[i].manager;
            const manager_id = res[i].manager_id;
            var newManager = {
                name: manager,
                value: manager_id
            }
            managers.push(newManager);
        }
        // console.log(managers)
        return managers;
        // console.log(managers)
    });
};

const getRole = () => {
    connection.query(`SELECT title, role_id FROM role`, (err, res) => {
        if (err) throw err;
        roles = [];
        for (let i = 0; i <res.length; i++) {
            const id = res[i].role_id;
            const title = res[i].title;
            var newRole = {
                name: title, 
                value: id
            }
            roles.push(newRole)
        }
        //console.log(roles)
        return roles;

    })
};

const getEmployee = () => {
    connection.query(`SELECT title, role_id FROM employee`, (err, res) => {
        if (err) throw err;
        employees = [];
        for (let i = 0; i <res.length; i++) {
            const id = res[i].role_id;
            const firstName = res[i].first_name;
            const lastName = res[i].last_name;
            var newEmployees = {
                name: firstName.concat (" ", lastName), 
                value: id
            }
            employees.push(newEmployees);
        }
        //console.log(newEmployees)
        return employees;
})
};

const roleCheck = `SELECT id, employee.first_name, title, salary, department.role, managers.manager
FROM employee
JOIN role ON employee.role_id = role.role_id
JOIN department ON role.department_id = department.department_id
LEFT JOIN managers on employee.manager_id = managers.manager_id`;

const init = () => {
    getEmployee();
    getRole();
    getManager();
    inquirer
    .prompt({
        name: "init",
        type: "rawlist",
        message: "what would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Employess By Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager", 
            "View All Roles",
            "View All Managers",
        ],
    })
    .then((answer) => {
        switch (answer.init) {
            case "View All Employees":
                allEmployees();
                break;

            case "View All Employees By Department":
                allEmployeeDepartment();
                break;
            
            case "View All Employees By Manager":
                allEmployeeManagers();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Remove Employee":
                removeEmployee();
                break;

            case "Update Employee Role":
                updateEmployee();
                break;

            case "Update Employee Manager":
                updateManager();
                break; 

            case "View All Roles":
                allRoles();
                break;

            case "View All Managers":
                allManagers();
                break;

            case "Exit":
                connection.end();
                break;


        }
    });
};


