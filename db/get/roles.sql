select role.id as ID, 
role.title as Title, 
role.salary as Salary,
department.name as Department
from role
join department
on role.department_id = department.id;