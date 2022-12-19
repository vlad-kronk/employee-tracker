select employee.id,
employee.first_name,
employee.last_name,
role.title,
role.salary,
department.name
from employee
join department
on role.department_id = department.id
join role
on employee.role_id = role.id