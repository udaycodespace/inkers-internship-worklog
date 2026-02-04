# Task Manager – Frontend (React + Vite)

This directory contains the **frontend UI** for the Task Manager application, built using **React** with **Vite** as the build tool.  
The frontend communicates with the Frappe backend exclusively through **custom whitelisted APIs** and relies on backend-enforced authentication and authorization.

---

## 🧠 Frontend Responsibilities

- Provides a clean UI for task management (CRUD).
- Implements **login and logout flow** using Frappe’s session-based authentication.
- Maintains user session using **HTTP cookies**.
- Blocks access to task pages for unauthenticated users.
- Relies fully on backend responses for task visibility and access control.

> All security and data isolation rules are enforced by the backend.

---

## 🚀 Features

- Task creation, status update, and deletion.
- Priority selection (High / Medium / Low) with visual indicators.
- Login screen before accessing tasks.
- Session persistence across page refresh.
- Confirmation prompts for destructive actions.

---

## 🛠️ Setup Instructions

1. Navigate to the frontend directory:
   ```bash
   cd frontend
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

The application will be available at:

```
http://localhost:5173
```

---

## ⚙️ Configuration

### Vite Proxy Setup

To avoid CORS issues during development, `vite.config.js` is configured to proxy API requests to the Frappe backend:

```js
server: {
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8000',
      changeOrigin: true
    }
  }
}
```

This allows the frontend to call backend APIs using relative paths such as:

```
/api/method/task_manager.api.get_tasks
```

---

## 🔐 Authentication Flow

* Login is handled via:

  ```
  /api/method/login
  ```
* Logout is handled via:

  ```
  /api/method/logout
  ```
* Session validation on page refresh uses:

  ```
  /api/method/frappe.auth.get_logged_user
  ```
* All API calls include:

  ```js
  credentials: "include"
  ```

No JWT, tokens, or custom authentication logic is used.

---

## 📸 Screenshots & Verification

Authentication flow, session persistence, and user isolation proofs are documented in:

```
/docs/screenshots-auth/
```

---

## 📌 Notes

* The frontend intentionally avoids frontend-side task filtering.
* All task visibility and permissions are controlled by the backend.
* The UI assumes a trusted backend enforcing access rules.
