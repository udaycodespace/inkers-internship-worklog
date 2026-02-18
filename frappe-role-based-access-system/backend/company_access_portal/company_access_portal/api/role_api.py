import frappe
from frappe import _


# ------------------------------
# Helper: Check Admin
# ------------------------------
def is_company_admin():
    user = frappe.session.user
    if user == "Guest":
        return False
    return "Company Admin" in frappe.get_roles(user)

# ------------------------------
# 1️⃣ List Roles
# ------------------------------
@frappe.whitelist()
def list_roles():
    if not is_company_admin():
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    roles = frappe.get_all(
        "Role",
        filters={
            "name": ["not in", ["Administrator", "Guest"]]
        },
        fields=["name", "role_name"],
        order_by="creation desc"
    )

    return roles


# ------------------------------
# 2️⃣ Create Role
# ------------------------------
@frappe.whitelist()
def create_role(role_name):
    if not is_company_admin():
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    if not role_name:
        frappe.throw(_("Role name is required"))

    if frappe.db.exists("Role", role_name):
        frappe.throw(_("Role already exists"))

    role = frappe.new_doc("Role")
    role.role_name = role_name
    role.insert(ignore_permissions=True)

    frappe.db.commit()

    return {"message": "Role created successfully"}


# ------------------------------
# 3️⃣ List DocTypes
# ------------------------------
@frappe.whitelist()
def list_doctypes():
    if not is_company_admin():
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    doctypes = frappe.get_all(
        "DocType",
        filters={
            "istable": 0,
            "issingle": 0
        },
        fields=["name", "module"],
        order_by="module asc"
    )

    return doctypes


# ------------------------------
# 4️⃣ Update DocType Permissions
# ------------------------------
@frappe.whitelist()
def update_doctype_permission(
    role,
    doctype,
    read=0,
    write=0,
    create=0,
    delete=0,
    submit=0
):
    if not is_company_admin():
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    if not role or not doctype:
        frappe.throw(_("Role and DocType are required"))

    # Check if permission exists
    existing = frappe.db.exists("DocPerm", {
        "role": role,
        "parent": doctype
    })

    if existing:
        perm = frappe.get_doc("DocPerm", existing)
    else:
        perm = frappe.new_doc("DocPerm")
        perm.parent = doctype
        perm.parenttype = "DocType"
        perm.parentfield = "permissions"
        perm.role = role

    perm.read = int(read)
    perm.write = int(write)
    perm.create = int(create)
    perm.delete = int(delete)
    perm.submit = int(submit)

    perm.save(ignore_permissions=True)
    frappe.db.commit()

    return {"message": "Permissions updated successfully"}
