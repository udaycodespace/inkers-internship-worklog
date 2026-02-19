# ⚛ Frontend – Company Access Portal

This is the React-based client application for the Company Access Portal. It serves as the primary administrative interface for managing users, roles, and system-wide permissions.

### 🛠 Tech Stack

* **Framework:** React.js
* **Routing:** React Router v6
* **State Management:** Context API (for Auth & Permissions)
* **API Client:** Axios (with custom interceptors)
* **Styling:** CSS3 / Modern UI Framework

---

## 🎯 Frontend Responsibilities

The frontend is designed to be a "Smart Interface" but a "Dumb Security Layer." Its primary goals are:

* **Session Management:** Handling logins and persistent auth states.
* **Role-Based UI (RBUI):** Conditionally rendering components based on user roles.
* **Permission Toggling:** Providing a matrix-style UI for `DocPerm` updates.
* **Secure Flows:** Managing the Reset Password UI and token validation.

> **Note:** While the frontend hides buttons (like 'Delete' or 'Create'), security is always re-enforced by the Frappe backend.

---

## 📂 Folder Structure

```text
src/
├── api/
│   └── frappe.js        # Axios instance & centralized API calls
├── context/
│   └── AuthContext.js   # Global state for user roles & session
├── pages/
│   ├── Login.js         # Custom login (bypasses Frappe Desk)
│   ├── Tasks.js         # Permission-sensitive CRUD page
│   ├── Admin.js         # User & Role management dashboard
│   ├── Roles.js         # Permission Matrix & Custom Role creation
│   └── ResetPassword.js # Token-based password update page
├── App.js               # Route protection & Layout
└── index.js             # Entry point

```

---

## 🔐 Authentication Logic

### Login Workflow

React communicates with `/api/method/login`. Upon a successful response:

1. A `react_auth` flag is set in storage.
2. `get_current_user_info()` is called to fetch the user’s specific role list.
3. The `AuthContext` updates, triggering a redirect to the dashboard.

### Secure Logout

To prevent session hijacking or "back-button" access:

* Calls `/api/method/logout`.
* **Hard Reset:** All `localStorage` and `sessionStorage` items are purged.
* **Redirect:** The user is pushed back to the `/` root.

---

## 👑 Role-Based UI Rendering

The `Tasks.js` and `Admin.js` pages use a custom hook to check permissions before rendering elements:

* **Company Admin:** Sees all management tabs and CRUD buttons.
* **Task Manager:** Sees Task CRUD but cannot access the "Roles" tab.
* **Task Viewer:** Only sees the "View" button; 'Edit' and 'Delete' are hidden.

---

## 🚀 Development

### Installation

```bash
npm install

```

### Run Locally

```bash
npm start

```

*The app will automatically proxy requests to the Frappe backend at `http://localhost:8002`.*

---

## 🧠 Technical Decisions

* **Context API over Redux:** Used Context API for a lightweight approach to managing auth state and global user permissions.
* **Strict Auth Cleanup:** Implemented a "No-Ghost-Session" policy where the frontend verifies the backend session on every page refresh to prevent stale logins.
* **Dynamic Matrix:** The Permission Matrix in `Roles.js` is generated dynamically from the backend Doctype list, ensuring the UI never goes out of sync with the DB schema.