# Project Overview

## Title
Frappe RBAC Admin Portal

## Objective

To build a complete admin-controlled user management system using:

- Frappe (Backend)
- React (Frontend)
- Native Role & Permission system (DocPerm)
- SMTP-based invitation workflow

The system enables:

- Admin-managed user creation
- Role-based access control (RBAC)
- Native Frappe authentication
- Backend-level permission enforcement
- Email-based onboarding flow

## Architecture

Frontend:
React + Axios + Session-based authentication

Backend:
Frappe Framework
Native User DocType
Native Role DocType
Native DocPerm permission system

No custom authentication or permission logic was implemented.
All access control strictly relies on Frappe’s native framework.
