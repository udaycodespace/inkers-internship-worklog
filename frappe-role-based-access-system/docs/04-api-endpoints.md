# Custom Backend APIs

## User APIs

GET:
api/method/company_access_portal.api.user_api.list_users

POST:
api/method/company_access_portal.api.user_api.create_user

Security:
Only accessible if role = Company Admin

---

## Role APIs

GET:
api/method/company_access_portal.api.role_api.list_roles

POST:
api/method/company_access_portal.api.role_api.create_role

POST:
api/method/company_access_portal.api.role_api.update_doctype_permission

Security:
Strict backend validation using frappe.get_roles()
