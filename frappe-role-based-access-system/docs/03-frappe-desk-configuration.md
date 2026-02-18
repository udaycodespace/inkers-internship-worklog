# Frappe Desk Configuration Steps

These configurations were done in Frappe Desk UI.

## 1. Roles Created

- Company Admin
- Company Employee

## 2. DocType Permission Configuration

DocType: Company Task

Company Admin:
- Read
- Write
- Create
- Delete
- Submit
- Share
- Export
- Email

Company Employee:
- Read (If Owner)
- Write (If Owner)
- Create
- Delete (If Owner)

This ensures employees can only manage their own tasks.

---

## 3. SMTP Configuration

Tools → Email Account

- Gmail SMTP used
- Enable Outgoing checked
- Default Outgoing enabled
- App password configured

System Settings:
Disable Email = OFF
