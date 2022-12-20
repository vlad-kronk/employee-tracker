select employee.id as ID,
concat(employee.first_name, ' ', employee.last_name) as Name,
role.salary as Salary,
department.name as Department,
role.title as Role,
concat(manager.first_name, ' ', manager.last_name) as Manager
from employee employee
-- where employee.manager_id = 1
join role
on employee.role_id = role.id
join department
on role.department_id = department.id
left join employee manager
on employee.manager_id = manager.id
order by employee.id;