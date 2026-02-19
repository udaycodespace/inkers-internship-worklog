# 📚 Technical Documentation – Company Access Portal

This directory contains the high-level architecture, design patterns, and systemic logic used to build the Company Access Portal. This serves as the primary technical reference for the system's internal workings.

---

## 📌 System Design Overview

The portal follows a **Headless RBAC (Role-Based Access Control) Model**. Unlike standard Frappe apps, we decoupled the presentation layer entirely.

### Layered Architecture:

1. **Presentation Layer (React):** State-driven UI that adapts based on user permissions.
2. **API Layer (REST):** Custom-built Python endpoints that translate frontend intent into backend actions.
3. **Security Engine (Frappe/DocPerm):** The core engine that validates permissions against the MariaDB schema.
4. **Data Layer (MariaDB):** Persistent storage for Users, Roles, and permissions.

---

## 🔐 Role Hierarchy & Logic

To maintain system stability, I categorized roles into three tiers. This prevents an admin from accidentally deleting a role that the Frappe framework requires to function.

### 1. System Roles (Protected)

* **Administrator / Guest / All**
* **Constraint:** Logic in `role_api.py` explicitly blocks any `DELETE` or `UPDATE` requests for these names.

### 2. Business Base Roles

* **Company Admin:** The "Superuser" of the React Portal.
* **Task Manager / Task Viewer / Reports Only**
* **Logic:** These are pre-seeded roles required for the application's business logic.

### 3. Custom Roles

* **Logic:** Created dynamically by the Admin.
* **Constraint:** Can only be deleted if the backend verifies that zero users are currently assigned to that role.

---

## 🔄 Reset Password Flow (Technical Sequence)

One of the most complex tasks was replicating the secure reset flow without using the Frappe Desk.

1. **Initiation:** Admin creates a user; `user_api.py` generates a high-entropy hex token.
2. **Notification:** A background job triggers an email with a unique link: `portal.com/reset-password?key=[token]`.
3. **Handshake:** When the user lands on the React page, the frontend sends the token to the backend for pre-validation.
4. **Update:** Once validated (and within the 20-minute window), the password is saved via `frappe.utils.password.update_password`.

---

## 📊 Permission Model Mapping

The system maps React UI toggles directly to the `DocPerm` table in Frappe.

| UI Action | Backend Field | Effect |
| --- | --- | --- |
| **Read Toggle** | `read` | Grants access to `GET` requests for the Doctype. |
| **Write Toggle** | `write` | Grants access to `PUT` / Edit requests. |
| **Create Toggle** | `create` | Grants access to `POST` / New doc requests. |
| **Delete Toggle** | `delete` | Grants access to `DELETE` requests. |

> **Security Guardrail:** Only Doctypes belonging to the `Company Access` module are visible and editable in this matrix to prevent accidental modification of core system settings.

---

## 📈 Future Roadmap & Improvements

* **Audit Logging:** Implement a `Portal Log` Doctype to track who changed which permission and when.
* **Role Templates:** Allow admins to "Clone" a role to speed up permission setup.
* **Session Heartbeat:** Add a background WebSocket check to immediately log out users if their permissions are revoked in real-time.