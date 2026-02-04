import frappe
from frappe import _


# =========================
# HELPER FUNCTIONS
# =========================

def _require_login():
    if frappe.session.user == "Guest":
        frappe.throw(_("Login required"), frappe.PermissionError)


def _is_company_admin():
    return "Company Admin" in frappe.get_roles(frappe.session.user)


# =========================
# TASK APIs (USER)
# =========================

@frappe.whitelist()
def get_tasks():
    _require_login()

    return frappe.get_all(
        "Task",
        fields=[
            "name",
            "title",
            "status",
            "description",
            "due_date",
            "priority"
        ],
        filters={"owner": frappe.session.user},
        order_by="creation desc"
    )


@frappe.whitelist()
def add_task(title, description=None, due_date=None, priority="Medium"):
    _require_login()

    if not title:
        frappe.throw(_("Title is required"))

    doc = frappe.get_doc({
        "doctype": "Task",
        "title": title,
        "status": "Open",
        "description": description,
        "due_date": due_date,
        "priority": priority,
        "owner": frappe.session.user
    })

    doc.insert()
    return doc.name


@frappe.whitelist()
def update_task(name, status):
    _require_login()

    if not frappe.db.exists("Task", name):
        frappe.throw(_("Task not found"))

    doc = frappe.get_doc("Task", name)

    if doc.owner != frappe.session.user:
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    doc.status = status
    doc.save()
    return doc.name


@frappe.whitelist()
def delete_task(name):
    _require_login()

    if not frappe.db.exists("Task", name):
        frappe.throw(_("Task not found"))

    doc = frappe.get_doc("Task", name)

    if doc.owner != frappe.session.user:
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    frappe.delete_doc("Task", name)
    return "Deleted"


# =========================
# ADMIN USER ONBOARDING APIs
# =========================

@frappe.whitelist()
def admin_create_user(email, first_name, last_name, role):
    _require_login()

    if not _is_company_admin():
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    if not email:
        frappe.throw(_("Email is required"))

    if frappe.db.exists("User", email):
        frappe.throw(_("User already exists"))

    user = frappe.get_doc({
        "doctype": "User",
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "enabled": 1,
        "roles": [{"role": role}],
        "send_welcome_email": 1
    })

    user.insert(ignore_permissions=True)
    user.send_welcome_mail()

    return "Invitation email sent"


@frappe.whitelist()
def admin_list_users():
    _require_login()

    if not _is_company_admin():
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    return frappe.get_all(
        "User",
        fields=["email", "first_name", "last_name", "enabled"],
        order_by="creation desc"
    )
