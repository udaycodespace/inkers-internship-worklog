import frappe
from frappe import _

def check_admin():
    if "Company Admin" not in frappe.get_roles():
        frappe.throw(_("Not permitted"), frappe.PermissionError)
@frappe.whitelist()
def create_user(email, first_name, last_name, role):
    check_admin()

    if frappe.db.exists("User", email):
        frappe.throw("User already exists")

    user = frappe.get_doc({
        "doctype": "User",
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "enabled": 1,
        "send_welcome_email": 1,
        "roles": [
            {"role": role}
        ]
    })

    user.insert(ignore_permissions=True)
    frappe.db.commit()

    return {"message": "User created and invitation sent"}
@frappe.whitelist()
def list_users():
    check_admin()

    users = frappe.get_all(
        "User",
        filters={"name": ["not in", ["Administrator", "Guest"]]},
        fields=["name", "first_name", "last_name", "enabled"]
    )

    return users
@frappe.whitelist()
def list_roles():
    check_admin()

    roles = frappe.get_all(
        "Role",
        filters={"name": ["not in", ["Administrator", "Guest"]]},
        fields=["name"]
    )

    return roles
