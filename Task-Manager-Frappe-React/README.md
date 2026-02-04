# Task Manager Application (Frappe + React)

A full-stack Task Management application built using the **Frappe Framework** as the backend and **React (Vite)** as the frontend.  
The project demonstrates secure API design, session-based authentication, and backend-enforced user data isolation.

---

## 🚀 Key Features

- **Custom Backend APIs**
  - Uses `@frappe.whitelist()` for controlled RPC-style API access.
  - Avoids Desk-level REST APIs for finer backend control.

- **Authentication & User Isolation**
  - Built entirely using **Frappe’s session-based authentication**.
  - Tasks are private and scoped to the logged-in user.
  - Backend enforces ownership (no frontend filtering).

- **Task Management**
  - Create, Read, Update Status, Delete (CRUD).
  - Priority support: **High / Medium / Low**.
  - Visual priority badges in UI.

- **Security**
  - No guest access to task APIs.
  - Ownership validation for update/delete operations.
  - Confirmation before destructive actions.

- **Frontend**
  - React-based UI with login/logout flow.
  - Cookie-based session persistence.
  - Task pages are blocked for unauthenticated users.

---

## 📂 Project Structure

```

task-manager-frappe-react/
│
├── frontend/              # React (Vite) frontend
│   └── src/
│       └── App.jsx
│
├── backend/               # Frappe app
│   └── task_manager/
│       └── api.py
│
├── docs/
│   ├── authentication/    # Auth & user-isolation screenshots
│   ├── screenshots-installation/
│   ├── screenshots-execution/
│   └── screenshots-whitelist-api/
│
└── README.md

```

---

## 🔐 Authentication & Authorization

- Uses **Frappe’s built-in authentication** (`/api/method/login`, `/api/method/logout`).
- Session maintained via cookies (`credentials: "include"`).
- Session validity checked on page refresh.
- No JWT, tokens, or custom authentication logic.

---

## 📸 Documentation & Screenshots

Execution proofs and validation screenshots are available under the `docs/` directory:

- **Authentication & User Isolation**
  - `docs/authentication/`
- **Installation Proofs**
  - `docs/screenshots-installation/`
- **API Execution (Before Auth)**
  - `docs/screenshots-execution/`
- **Whitelisted API Execution**
  - `docs/screenshots-whitelist-api/`

---

## 🛠️ Setup & Usage

Please refer to the individual README files inside:

- `frontend/README.md`
- `backend/README.md`

for detailed setup instructions.

---

## 📌 Notes

- Tasks created prior to authentication enforcement may not have ownership and are intentionally ignored.
- All access control rules are enforced at the backend level.
