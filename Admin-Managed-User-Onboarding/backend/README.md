# Backend – Admin-Managed User Onboarding

This folder contains the backend implementation for the **Admin-Managed User Creation and Onboarding** feature built using the **Frappe Framework**.

---

## Overview

The backend leverages Frappe’s native capabilities:

* User DocType
* Role-based access control
* Built-in email invitation / password reset flow
* Session-based authentication

No custom authentication or password handling is implemented.

---

## Files

### `api.py`

Contains whitelisted backend APIs for:

#### User APIs

* Fetch tasks owned by the logged-in user
* Create, update, and delete tasks with proper permission checks

#### Admin APIs

* **`admin_create_user`**

  * Admin-only
  * Creates users in enabled state
  * Assigns role (Company Admin / Company Employee)
  * Sends invitation email using Frappe’s built-in email system

* **`admin_list_users`**

  * Admin-only
  * Returns list of users
  * Excludes sensitive fields

---

## Security

* All admin actions are protected at the **backend level**
* Non-admin users are blocked using role checks
* Guest users are not allowed to access protected APIs

---

## Notes

* Users are created in an **enabled state**
* Passwords are never set manually
* Email-based onboarding is mandatory

---

This backend is designed to be consumed by a React frontend.