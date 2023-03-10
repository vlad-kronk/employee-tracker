select employee.id as ID,
concat(employee.first_name, ' ', employee.last_name) as Name,
role.salary as Salary,
department.name as Department,
role.title as Role
from employee
join role
on employee.role_id = role.id
join department
on role.department_id = department.id
where department.id = 2;