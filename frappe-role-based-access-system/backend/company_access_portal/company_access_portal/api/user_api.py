import frappe
from frappe import _


def is_company_admin():
    return "Company Admin" in frappe.get_roles()


@frappe.whitelist()
def list_users():
    if not is_company_admin():
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    users = frappe.get_all(
        "User",
        fields=["name", "first_name", "last_name", "enabled"],
        order_by="creation desc"
    )

    return users


@frappe.whitelist()
def create_user(email=None, first_name=None, last_name=None, role=None):
    if not is_company_admin():
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
        "send_welcome_email": 1
    })

    user.insert(ignore_permissions=True)

    # Assign Role
    user.add_roles(role)

    frappe.db.commit()

    return {"message": "User created and invitation sent"}
@frappe.whitelist()
def get_current_user_info():
    if frappe.session.user == "Guest":
        frappe.throw("Not Logged In", frappe.PermissionError)

    roles = frappe.get_roles(frappe.session.user)

    return {
        "email": frappe.session.user,
        "roles": roles
    }
