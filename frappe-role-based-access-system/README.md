# 🏢 Frappe RBAC Admin Portal

A role-based admin-controlled user management system built using:

* **Frappe Framework (Backend)**
* **React (Frontend)**
* **Native Frappe Role & Permission System (DocPerm)**
* **SMTP-based email onboarding**

This project demonstrates secure, backend-enforced role-based access control with admin-managed user onboarding.

---

## 🎯 Objective

To implement an admin-controlled system where:

* Admins can create users from React frontend
* Users receive email invitation to set password
* Authentication uses native Frappe session handling
* Roles and permissions are strictly enforced at backend level
* No custom authentication or parallel permission logic is used

All access control relies exclusively on:

* `User` DocType
* `Role` DocType
* `DocPerm / Role Permission Manager`

---

## 🧠 Key Features Implemented

### ✅ Admin User Management

* Create users from React UI
* Assign roles during creation
* Send password setup invitation via email
* List all users (Admin only)

---

### ✅ Role-Based Access Control (RBAC)

* Create custom roles
* Assign DocType-level permissions
* Enforce backend role validation
* Block unauthorized API access

---

### ✅ Task Management System

* Create tasks
* Update tasks
* Delete tasks
* Employees can manage only their own tasks
* Admin can view all tasks

---

### ✅ Secure Backend Validation

* All APIs check roles using `frappe.get_roles()`
* No frontend-only security
* No ignore_permissions in business logic
* Strict role enforcement

---

### ✅ Email Onboarding Flow

* SMTP configured using Gmail App Password
* Default outgoing email account set
* Invitation link generated automatically
* User sets password via reset link
* Login via session-based authentication

---

## 🏗 Architecture Overview

Frontend:
React + Axios + Session Cookies

Backend:
Frappe Framework
Native Role & Permission System
MariaDB + Redis

Authentication:
Frappe Session-based authentication

No JWT or custom token system implemented.

---

## 🚀 How To Run

### Backend (WSL)

```bash
wsl
cd ~/role_system_bench
bench start
```

Access:
[http://127.0.0.1:8002](http://127.0.0.1:8002)

---

### Frontend (Windows)

```bash
cd company-portal-frontend
npm install
npm start
```

Access:
[http://localhost:3000](http://localhost:3000)

---

## 🔐 Roles Implemented

### Company Admin

* Full access to tasks
* Manage users
* Create roles
* Assign permissions

### Company Employee

* Create tasks
* Read/Write/Delete only own tasks (If Owner)
* No admin access
* Blocked at API level

---

## 📬 Email Configuration

* Gmail SMTP used
* App password authentication
* Default outgoing email enabled
* Reset password template used

---

## 🧪 Testing Performed

✔ Admin can create users
✔ Email invitation triggers correctly
✔ Reset link sets password
✔ Employee login successful
✔ Employee restricted from admin APIs
✔ Employee cannot modify other users' tasks
✔ Backend blocks unauthorized API access

---

## ⚠ Current Scope

The current implementation includes:

* Role creation
* DocType permission assignment
* User-role linking
* Admin UI for user management

The UI is functional and security-focused.
Further UI refinement and advanced module-level permission visualization may be expanded in future iterations.

---

## 📌 Notes

* System uses native Frappe permission framework.
* No custom permission tables.
* No parallel access control mechanism.
* Backend is the single source of truth for authorization.

---

## 📎 Status

Core functionality is complete and operational.
Additional improvements and refinements are ongoing as part of iterative development.