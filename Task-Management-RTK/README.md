# Task Management Application (Evolution: v1.0  v2.0)

A professional React application demonstrating centralized state management and automated API synchronization. Developed as part of the internship learning phase at **Inkers Technology Private Limited**.

## 🔄 Project Evolution (The "Ownership" Transition)

This project began as a standard implementation of the assigned requirements (v1.0) but was proactively upgraded to a production-simulated environment (v2.0) to ensure data persistence and usability.

| Feature | Initial Requirement (v1.0) | My Enhanced Implementation (v2.0) |
| --- | --- | --- |
| **Data Source** | JSONPlaceholder (Resets on refresh) | **MockAPI.io (Persistent Database)** |
| **Input Logic** | Hardcoded String ("New Intern Task") | **Dynamic User Input Form** |
| **CRUD Scope** | Add / Delete / Toggle Status | **Add / Delete / Toggle / Edit Title** |
| **User Experience** | Native Browser `alert()` | **React-Toastify Notifications** |
| **UI Design** | Basic List | **Professional High-Contrast Dashboard** |

---

## 🎯 Project Objectives & Intern POV

The objective was to move beyond local component state and implement a **"Single Source of Truth"** architecture. My approach involved breaking down the high-level requirements into sequential issues, solving them stage-by-stage to ensure code quality and cache integrity.

---

## 🛠 Tech Stack

* **Core:** React (Vite)
* **State:** Redux Toolkit (Slices & Middleware)
* **Data:** RTK Query (Automated Caching & Mutations)
* **Backend:** MockAPI (RESTful Persistence)
* **UI:** React-Toastify & CSS Variables

---

## 🏗 Technical Justification (The "Why")

To meet the expectations of my mentors, I implemented the following architectural patterns:

* **RTK Query over `useEffect**`: I replaced manual data fetching with RTK Query hooks to eliminate the "loading/error/data" boilerplate.
* **Tag-Based Invalidation**: I used `providesTags` and `invalidatesTags`. This ensures the app is "reactive"—automatically refetching the list only when a mutation occurs.
* **Global Auth Store**: Authentication is handled in a dedicated Redux Slice, ensuring that `isAuthenticated` state is accessible to all components without prop-drilling.

---

## 📈 The Development Roadmap

### Phase 1: Foundation (The Base)

* **Issue #1:** Project Initialization & Folder Structure (`features/`).
* **Issue #2:** Redux Store Configuration with Middleware.
* **Issue #3:** Auth Slice & Login Flow implementation.

### Phase 2: RTK Query Integration (The Logic)

* **Issue #4:** API Setup using `createApi` and `fetchBaseQuery`.
* **Issue #5:** Implemented `getTasks` to remove local state dependency.
* **Issue #6:** Defined Mutations for `addTask`, `deleteTask`, and `updateTask`.

### Phase 3: Proactive Refinements (The Upgrade)

* **Issue #7 - Persistence:** Migrated `baseUrl` to MockAPI to solve data loss on refresh.
* **Issue #8 - Edit Capability:** Added local state handling to allow users to **Rename** tasks, not just toggle them.
* **Issue #9 - UX Polish:** Replaced alerts with Toasts and added a clean, "Edge-style" CSS theme.

---

## 📂 Project Structure

```text
task-management-rtk/
├── src/
│   ├── app/ 
│   │   └── store.js         # Centralized Store
│   ├── components/ 
│   │   └── Tasks.jsx        # UI with Edit/Delete/Toggle Logic
│   ├── features/
│   │   ├── auth/            # authSlice.js (Global State)
│   │   └── tasks/           # tasksApi.js (API & Caching)
│   └── main.jsx             # Provider & Toast Wrapper
└── README.md                # Documentation

```

---

### **SOMAPURAM UDAY**

**Intern @ Inkers Technology Private Limited**