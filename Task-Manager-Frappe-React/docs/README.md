## 📸 Documentation & Proof of Work

This directory contains execution screenshots and evidence covering the **complete development lifecycle** of the project — from environment setup, to backend evolution, to **authentication and user-based data isolation**.

The documentation is structured in **phases** to clearly show how the system evolved and what the **final, evaluated implementation** is.

---

## 📂 Evidence Structure

### 1. 📦 [Installation & Setup](./screenshots-installation)

**Phase 1: Environment Configuration**

Screenshots validating the initial project setup, including:

* Successful installation of the **Frappe Framework**
* Bench initialization and site creation
* Database setup and verification of the `Task` DocType
* Initial environment readiness before application logic

---

### 2. 🔁 [Standard REST API Execution](./screenshots-execution)

**Phase 2: Initial Prototype (Validation Phase)**

Evidence of the application working using **Frappe’s default REST APIs**:

* API calls to `/api/resource/Task`
* Frontend validation using standard REST endpoints
* Used temporarily to validate frontend functionality

> **Note:** This phase was intentionally used as a stepping stone before migrating to custom whitelisted APIs.

---

### 3. ⚙️ [Whitelisted API Execution (Final)](./screenshots-whitelist-api)

**Phase 3: Custom Backend Logic (Current Version)**

This represents the **final backend architecture**.

Includes screenshots demonstrating:

* Fully functional task CRUD using custom whitelisted APIs
* Network tab evidence of RPC-style calls:

  * `task_manager.api.add_task`
  * `task_manager.api.get_tasks`
  * `task_manager.api.update_task`
  * `task_manager.api.delete_task`
* Server-side validation errors (e.g., *“Task Title is required”*)
* Priority system rendering (High / Medium / Low badges)
* Confirmation dialogs for destructive actions

✅ This phase reflects the **core business logic and final backend design**.

---

### 4. 🔐 [Authentication & User Isolation](./screenshots-auth)

**Phase 4: Authentication & Access Control (Final Security Layer)**

Screenshots validating **Frappe-based authentication and backend-enforced user isolation**, including:

* Login screen before accessing tasks
* Successful login and task access
* Session persistence after browser refresh
* User-based task isolation across different accounts
* API access blocked for unauthenticated users
* API access allowed only after login, returning user-owned tasks

✅ Confirms that:

* Tasks are no longer public
* Every API call is tied to a logged-in user
* Backend enforces ownership and access control

---

## 🔍 Verification Checklist

For reviewers, the **current and evaluated state** of the project can be verified by focusing on:

* **Phase 3 – Whitelisted API Execution**
* **Phase 4 – Authentication & User Isolation**

These phases together demonstrate:

* ✅ Custom whitelisted backend APIs
* ✅ Backend-enforced user ownership
* ✅ Session-based authentication (no JWT / tokens)
* ✅ Priority system (High / Medium / Low)
* ✅ Server-side validations
* ✅ Manual SQL schema updates
* ✅ Secure React ↔ Frappe integration

---

## 📌 Notes

* Earlier phases are preserved intentionally to show **progressive development** and decision-making.
* The final production-ready implementation is represented by **Phase 3 and Phase 4**.
* All access control logic resides in the backend to ensure security and consistency.