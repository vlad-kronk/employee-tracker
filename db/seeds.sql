insert into department (id, name)
values  (1, "Sales"),
        (2, "Engineering"),
        (3, "Finance"),
        (4, "Legal");

insert into role (id, title, salary, department_id)
values  (1, "Salesperson", 80000, 1),
        (2, "Sales Manager", 125000, 1),
        (3, "Accountant", 120000, 3),
        (4, "Accounting Manager", 160000, 3),
        (5, "Software Engineer", 125000, 2),
        (6, "Lead Engineer", 165000, 2),
        (7, "Lawyer", 190000, 4),
        (8, "Legal Team Lead", 250000, 4),
        (9, "Legal Secretary", 75000, 4);

insert into employee (id, first_name, last_name, manager_id, role_id)
values  (1, "Stefanu", "Durnin", null, 2),
        (2, "Dorina", "Echevarria", 1, 1),
        (3, "Zhong", "Johansen", 1, 1),
        (4, "Baltasar", "Christinsen", null, 4),
        (5, "Yuliya", "Hollands", 4, 3),
        (6, "Hadijah", "Konstantinov", 4, 3),
        (7, "Dominicus", "Figueroa", 4, 3),
        (8, "Lucia", "O Dubhghaill", null, 6),
        (9, "Nia", "Danailov", 8, 5),
        (10, "Sead", "Alders", 8, 5),
        (11, "Irina", "Cerveny", 8, 5),
        (12, "Axel", "Wesley", null, 6),
        (13, "Jocelyn", "Priddy", 12, 5),
        (14, "Malai", "Nishiyama", 12, 5),
        (15, "Tiziano", "Abbey", null, 8),
        (16, "Camilla", "Tierney", 15, 7),
        (17, "Vusala", "Cionaodha", 15, 7),
        (18, "Kane", "Forsberg", 15, 9),
        (19, "Stanislaw", "Vega", 16, 9),
        (20, "Mohamad", "Bonhomme", 17, 9);