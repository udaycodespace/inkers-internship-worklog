# Admin-Managed User Onboarding System

## Objective

Implement an **admin-only user management and onboarding system** using:

* Frappe backend
* React frontend
* Native authentication, roles, and email invitation system

---

## Features Implemented

### Backend (Frappe)

* Admin-only user creation
* User onboarding via built-in email invitation / reset-password flow
* Role-based access control enforced strictly at the backend
* Secure user listing API with sensitive fields excluded
* Native **User DocType** usage (no custom authentication)

### Frontend (React)

* Admin-only dashboard
* User list view
* Add new user form (email, first name, last name, role)
* Invitation confirmation UI after user creation
* Session-based authentication

---

## Folder Structure

```
Admin-Managed-User-Onboarding/
├── backend/
│   ├── api.py
│   └── README.md
├── docs/
│   ├── README.md
│   └── screenshots/
│       ├── 01_roles_created.png
│       ├── 02_backend_api_code.png
│       ├── 03_admin_user_list.png
│       └── 04_non_admin_access_blocked.png
└── README.md
```

---

## Notes

* Users are created in an **enabled state**
* Passwords are **never handled manually**
* Email-based onboarding is mandatory
* Backend strictly enforces role-based permissions
* Non-admin users are blocked at API level

---

This submission contains the backend implementation, documentation, and proof screenshots for review.
