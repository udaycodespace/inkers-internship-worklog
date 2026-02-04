# Task Manager – Backend (Frappe)

This directory contains the **backend implementation** of the Task Manager application, built using the **Frappe Framework**.  
The backend is responsible for authentication, authorization, business logic, and enforcing user-level data isolation.

---

## 🧠 Backend Design Highlights

- Uses **custom whitelisted APIs** instead of Desk-level REST APIs.
- Relies entirely on **Frappe’s built-in session authentication**.
- Enforces **user-based task ownership at the backend**, not the frontend.
- Designed to work seamlessly with a React frontend via RPC-style calls.

This backend intentionally avoids:
- JWT or token-based authentication
- Frontend-driven access control
- Custom user or ownership fields

---

## 📄 Key File: `api.py`

The core backend logic resides in:

```

task_manager/api.py

````

### What `api.py` handles
- Authentication validation using `frappe.session.user`
- Task CRUD operations
- Automatic ownership assignment on task creation
- Ownership validation on update and delete
- Filtering tasks so users can access **only their own data**

All APIs are exposed using:
```python
@frappe.whitelist()
````

Guest access is explicitly **not allowed**.

---

## 🔐 Authentication & Authorization

* Uses **Frappe session-based authentication**.
* APIs are accessible only to authenticated users.
* User identity is resolved via:

  ```python
  frappe.session.user
  ```
* Task ownership is enforced using Frappe’s built-in `owner` field.
* Any unauthorized access attempts result in permission errors.

---

## 🛠️ Setup Instructions

### 1️⃣ Place API file

Copy `api.py` into your Frappe app:

```bash
apps/task_manager/task_manager/api.py
```

---

### 2️⃣ Add Priority Column (Required)

Since the Desk UI is not used for schema management, the priority field is added manually:

```sql
ALTER TABLE `tabTask`
ADD COLUMN `priority` VARCHAR(140) DEFAULT 'Medium';
```

This enables:

* High / Medium / Low task prioritization
* Priority-based UI indicators in the frontend

---

### 3️⃣ Start / Restart Bench

For local development:

```bash
bench start
```

> Note: `bench restart` is required only in supervisor-based setups.

---

## 🔌 Available API Endpoints

| Method | Endpoint                       |
| ------ | ------------------------------ |
| GET    | `task_manager.api.get_tasks`   |
| POST   | `task_manager.api.add_task`    |
| POST   | `task_manager.api.update_task` |
| POST   | `task_manager.api.delete_task` |

All endpoints:

* Require an authenticated session
* Operate only on tasks owned by the logged-in user

---

## ✅ Data Isolation Guarantee

The backend guarantees:

* Tasks are **not publicly accessible**
* Users can **only view, modify, or delete their own tasks**
* Access rules are enforced server-side, regardless of frontend behavior

---

## 🧪 Verification

Authentication and user-isolation behavior is documented with execution proofs in:

```
/docs/authentication/
```

This includes:

* Login/logout flow
* Session persistence
* Cross-user task isolation
* API access restrictions

---

## 📌 Notes

* Tasks created before ownership enforcement may not appear and are intentionally ignored.
* All access control logic resides in the backend to ensure security and consistency.
