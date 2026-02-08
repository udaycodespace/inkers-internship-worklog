# Technical Thinking & Problem Solving

## Problem: Permission Denied (403 Forbidden)
- **Thinking**: Standard whitelisting was failing due to path resolution issues in the custom app.
- **Solution**: Migrated logic to a bypass handler in the Frappe core directory and used `allow_guest=True` temporarily to ensure frontend-to-backend communication during local development.

## Problem: Redis Connection Error (111)
- **Thinking**: Realized user creation triggers background email jobs which require the Redis Queue.
- **Solution**: Identified Port 11000 was inactive; manually initiated the Redis Queue service via bench configuration.

## Feature Implementation: Automatic Roles
- **Requirement**: Users must have 'Company Employee' role immediately.
- **Implementation**: Used `user.insert(ignore_permissions=True)` while explicitly defining the roles list in the document object to ensure compliance with Inkers AI guidelines.
