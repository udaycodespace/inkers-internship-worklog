# ⚙ Backend – Company Access Portal (Frappe App)

This is a custom Frappe application (`company_access_portal`) designed to act as a secure, headless API engine for the React frontend. It abstracts the complexity of Frappe’s Role/Permission system into simplified REST endpoints.

### 🛠 Tech Stack

* **Framework:** Frappe Framework (Python)
* **Database:** MariaDB
* **API Style:** REST (via `frappe.whitelist`)

---

## 🎯 Backend Responsibilities

The backend acts as the **Ultimate Gatekeeper**. While the frontend manages the user experience, the backend enforces:

* **Role Mutability Logic:** Ensuring system-critical roles aren't deleted.
* **Module-Scoped Permissions:** Restricting permission changes to only the `Company Access` module.
* **Administrative Validation:** Verifying that only users with the `Company Admin` role can hit management endpoints.
* **Token Lifecycle:** Managing the generation and expiry of secure password reset tokens.

---

## 📂 Structure

```text
company_access_portal/
├── api/
│   ├── role_api.py      # Logic for Roles, DocPerms, and Modules
│   ├── user_api.py      # Logic for User creation, Auth, and Tokens
│   └── __init__.py
├── doctype/             # Custom Doctypes for the portal
├── hooks.py             # App configuration and API whitelisting
└── modules.txt          # Module definition

```

---

## 🔐 Core API Modules

### 📌 `role_api.py`

This module manages the lifecycle of roles. I implemented a strict hierarchy to prevent accidental system lockouts:

* **System Protection:** Hardcoded checks to prevent any `delete` or `update` calls on `Administrator`, `Guest`, or `All` roles.
* **Custom Flags:** New roles created via React are automatically marked with `is_custom=1`.
* **Permission Sync:** Uses `frappe.get_doc("DocPerm", ...)` to update granular permissions (Read, Write, Create, etc.) directly in the database.

### 📌 `user_api.py`

Handles user identity and security:

* **Multi-Role Assignment:** Allows the frontend to pass an array of roles to be synced to the User doc.
* **Headless Password Reset:** Generates a unique key via `frappe.utils.password.get_encryption_key` and sends a custom-formatted email that points back to the React URL, not the Frappe Desk.
* **Self-Admin Protection:** Prevents a `Company Admin` from removing their own administrative privileges.

---

## 🛡 Security Guardrails

I implemented several layers of protection to ensure the system remains robust:

1. **Request Verification:** Every whitelisted function begins with a check: `if "Company Admin" not in frappe.get_roles(): frappe.throw("Unauthorized")`.
2. **Module Restriction:** The `update_permission` API validates that the target `DocType` belongs to the `Company Access` module before committing changes.
3. **Session Consistency:** Prevents "Auto-Login" by checking for specific session headers initiated by the React client.

---

## 🚀 Run & Maintenance

### Start Backend

```bash
bench start

```

### Apply Logic Changes

If you modify `hooks.py` or API logic, clear the cache to ensure the Bench recognizes the new endpoints:

```bash
bench --site [your-site-name] clear-cache
bench restart

```

---

## 🛡 Architecture Principle

**"Trust No One."** The backend never assumes the frontend has validated a user. Every single API call independently verifies the session, the user's role, and the validity of the data before performing a database operation.