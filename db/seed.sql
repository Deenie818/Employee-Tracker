INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 1, null), ("Toby", "Flenderson", 2, 1), ("Pam", "Beesly", 3, 1), ("Jim", "Halpert", 4, 1);

INSERT INTO managers(manager)
VALUES("Michael Scott");

SELECT * FROM employee;
SELECT * FROM managers;