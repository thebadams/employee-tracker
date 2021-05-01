SELECT
emp.first_name
,emp.last_name
,concat(mgr.first_name, " ", mgr.last_name) as manager_name
,emp.id as emp_id
,mgr.id as mgr_id
,emp.manager_id
,roles.title
,dept.name as department
FROM employees as emp, roles as roles, departments as dept, employees as mgr
WHERE emp.role_id = roles.id
AND roles.department_id = dept.id
AND emp.manager_id = mgr.id
ORDER BY emp.last_name, emp.first_name;