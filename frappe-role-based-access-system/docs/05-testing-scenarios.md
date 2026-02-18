# Testing Scenarios

## Scenario 1 – Admin Workflow

1. Login as Admin
2. View Tasks
3. Create Task
4. Delete Task
5. Go to Admin Panel
6. Create User
7. Assign Role
8. Verify invitation email received

Expected Result:
All operations successful.

---

## Scenario 2 – Employee Workflow

1. Click invitation link
2. Set password
3. Login via frontend
4. Create task
5. Attempt to delete another user's task

Expected Result:
Access denied.

---

## Scenario 3 – API Security

Login as Employee

Try:
api/method/company_access_portal.api.user_api.list_users

Expected:
PermissionError
