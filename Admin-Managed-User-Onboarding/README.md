# Admin-Managed User Onboarding System
**Internship Task: Inkers AI (Completed Feb 08, 2026)**

## Overview
A full-stack implementation allowing Admins to create and manage users via a React frontend, leveraging Frappe's native authentication and role-based access control.

## Project Structure
- **/frontend**: Full React application containing the Admin Dashboard.
- **/backend**: Custom Frappe API handlers for user creation and role assignment.
- **/docs**: Technical notes on error resolution and system architecture.

## How to Run
1. Start Redis Cache: `redis-server ./config/redis_cache.conf` (Port 13000)
2. Start Redis Queue: `redis-server ./config/redis_queue.conf` (Port 11000)
3. Start Backend: `bench serve --port 8000`
4. Start Frontend: `cd frontend && npm start`
