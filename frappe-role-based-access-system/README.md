# 🚀 Company Access Portal

### Enterprise-Grade RBAC Implementation

**Role:** Full Stack Intern

**Company:** Inkers Technology Pvt. Ltd.

**Tech Stack:** React.js, Frappe (Python/MariaDB), Axios, REST API

---

## 👋 Overview

During my internship at **Inkers Technology**, I was tasked with solving a common enterprise friction point: managing complex Frappe permissions without exposing the technical "Backend Desk" to non-technical administrators.

I engineered a **Role-Based Access Control (RBAC)** system that allows for complete user and permission management through a custom React interface while maintaining the high-security standards of the native Frappe `DocPerm` engine.

---

## 📂 Project Structure

```text
company-access-portal/
├── frontend/     # React.js SPA (User Interface & Auth logic)
├── backend/      # Frappe App (Custom REST API & Permission Logic)
└── docs/         # Architecture, Security Protocols & API References

```

---

## 🎯 The Internship Challenge

The project was defined by three core requirements:

1. **Frontend Sovereignty:** All administrative actions (Role creation, Permission toggling, User onboarding) must happen in React.
2. **Zero Desk Exposure:** The "Reset Password" and "User Creation" flows must bypass the Frappe default UI entirely.
3. **Backend Integrity:** The frontend should be "dumb" regarding security; the backend must independently validate every request using Frappe's native session and role validation.

---

## 🏗 System Architecture

1. **The Request:** React sends a structured API call via Axios.
2. **The Interceptor:** Custom Python modules (`role_api.py`, `user_api.py`) validate the requester's identity.
3. **The Enforcement:** The system queries Frappe's native `DocPerm` to check if the action is allowed.
4. **The Response:** Data is returned only if the backend security layer is satisfied.

---

## 🛠 Features at a Glance

* **Dynamic Role Management:** Create, delete, and modify custom roles on the fly.
* **Permission Matrix:** A granular UI to toggle Read/Write/Create/Delete/Submit permissions for specific Doctypes.
* **Secure Reset Flow:** A tokenized, time-sensitive (20 min) password reset system built to operate outside the Frappe Desk.
* **Protected Roles:** Hardcoded logic to prevent the accidental deletion of "System" and "Business" roles.

---

## 🚀 Getting Started

### ⚙️ Backend Setup

```bash
cd backend
bench start
# If applying schema changes:
bench --site [your-site-name] clear-cache && bench restart

```

### ⚛️ Frontend Setup

```bash
cd frontend
npm install
npm start

```

* **App URL:** `http://localhost:3000`
* **API Port:** `http://localhost:8002`

---

## 👨‍💻 Author

**UDAY** *Full Stack Intern – Inkers Technology Pvt. Ltd.* *Final Year Computer Science & Technology*