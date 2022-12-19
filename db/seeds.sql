insert into department (name)
values  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

insert into role (title, salary, department_id)
values  ("Salesperson", 80000, 1),
        ("Sales Manager", 125000, 1),
        ("Accountant", 120000, 3),
        ("Accounting Manager", 160000, 3),
        ("Software Engineer", 125000, 2),
        ("Lead Engineer", 165000, 2),
        ("Lawyer", 190000, 4),
        ("Legal Team Lead", 250000, 4),
        ("Legal Secretary", 75000, 4);

insert into employee (first_name, last_name, manager_id, role_id)
values  ("Stefanu", "Durnin", null, 2),
        ("Dorina", "Echevarria", 1, 1),
        ("Zhong", "Johansen", 1, 1),
        ("Baltasar", "Christinsen", null, 4),
        ("Yuliya", "Hollands", 4, 3),
        ("Hadijah", "Konstantinov", 4, 3),
        ("Dominicus", "Figueroa", 4, 3),
        ("Lucia", "O Dubhghaill", null, 6),
        ("Nia", "Danailov", 8, 5),
        ("Sead", "Alders", 8, 5),
        ("Irina", "Cerveny", 8, 5),
        ("Axel", "Wesley", null, 6),
        ("Jocelyn", "Priddy", 12, 5),
        ("Malai", "Nishiyama", 12, 5),
        ("Tiziano", "Abbey", null, 8),
        ("Camilla", "Tierney", 15, 7),
        ("Vusala", "Cionaodha", 15, 7),
        ("Kane", "Forsberg", 15, 9),
        ("Stanislaw", "Vega", 16, 9),
        ("Mohamad", "Bonhomme", 17, 9);