drop database if exists employees_db;
create database employees_db;

use employees_db;

create table department (
    id int not null auto_increment,
    name varchar(30),

    primary key (id)
);

create table role (
    id int not null auto_increment,
    title varchar(30),
    salary decimal,
    department_id int,

    primary key (id),
    
    foreign key (department_id)
    references department(id)
    on delete set null
);

create table employee (
    id int not null auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    manager_id int default null,
    role_id int,

    primary key (id),

    foreign key (manager_id)
    references employee(id)
    on delete set null,
    
    foreign key (role_id)
    references role(id)
    on delete set null
);