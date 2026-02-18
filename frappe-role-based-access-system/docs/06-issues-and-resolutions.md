# Issues Faced & Solutions

## 1. 403 Permission Errors

Cause:
Frontend calling Frappe without proper session cookies.

Solution:
Enabled:
withCredentials: true in Axios config.

---

## 2. Employee Accessing Admin Route

Cause:
Frontend-only route protection.

Solution:
Added backend-level role validation inside whitelisted APIs.

---

## 3. Email Not Sending

Error:
Please setup default outgoing Email Account

Solution:
Configured SMTP using Gmail App Password.
Enabled Default Outgoing.
Disabled "Disable Email" flag.

---

## 4. Employees Seeing Admin Tasks

Cause:
DocPerm misconfiguration.

Solution:
Enabled "If Owner" for Company Employee role.
Removed global read permission.
