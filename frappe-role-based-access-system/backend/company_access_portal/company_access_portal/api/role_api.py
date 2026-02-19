import frappe
from frappe import _
from frappe.utils.data import cint


# ============================================================
# 🔐 ADMIN VALIDATION
# ============================================================

def is_company_admin():
    user = frappe.session.user

    if not user or user == "Guest":
        return False

    roles = frappe.get_roles(user)
    return "Company Admin" in roles or "System Manager" in roles


def throw_if_not_admin():
    if not is_company_admin():
        frappe.throw(_("Not permitted"), frappe.PermissionError)


# ============================================================
# 🚫 SYSTEM ROLES (NEVER TOUCH)
# ============================================================

SYSTEM_ROLES = ["Administrator", "Guest", "All"]


# ============================================================
# 🏢 BUSINESS BASE ROLES (CORE APP ROLES)
# ============================================================

BUSINESS_ROLES = [
    "Company Admin",
    "Company Employee",
    "Task Manager",
    "Task Viewer",
    "Reports Only"
]


# ============================================================
# 1️⃣ LIST ROLES (BUSINESS + ALL NON-SYSTEM ROLES)
# ============================================================

@frappe.whitelist()
def list_roles():
    throw_if_not_admin()

    all_roles = frappe.get_all("Role", pluck="name")

    filtered = []

    for name in all_roles:

        # Skip system roles
        if name in SYSTEM_ROLES:
            continue

        # Always include business roles
        if name in BUSINESS_ROLES:
            filtered.append({"name": name})
            continue

        # Include any other non-system roles
        filtered.append({"name": name})

    filtered = sorted(filtered, key=lambda x: x["name"].lower())

    return filtered


# ============================================================
# 2️⃣ CREATE ROLE
# ============================================================

@frappe.whitelist()
def create_role(role_name=None):
    throw_if_not_admin()

    if not role_name:
        frappe.throw(_("Role name is required"))

    role_name = role_name.strip()

    if len(role_name) < 3:
        frappe.throw(_("Role name must be at least 3 characters"))

    if len(role_name) > 50:
        frappe.throw(_("Role name too long"))

    if role_name in SYSTEM_ROLES:
        frappe.throw(_("System role cannot be created"))

    if frappe.db.exists("Role", role_name):
        frappe.throw(_("Role already exists"))

    role = frappe.new_doc("Role")
    role.role_name = role_name
    role.insert(ignore_permissions=True)

    frappe.db.commit()

    return {"message": "Role created successfully"}


# ============================================================
# 3️⃣ DELETE ROLE
# ============================================================

@frappe.whitelist()
def delete_role(role_name=None):
    throw_if_not_admin()

    if not role_name:
        frappe.throw(_("Role name is required"))

    if role_name in SYSTEM_ROLES:
        frappe.throw(_("System role cannot be deleted"))

    if role_name in BUSINESS_ROLES:
        frappe.throw(_("Business role cannot be deleted"))

    if not frappe.db.exists("Role", role_name):
        frappe.throw(_("Role does not exist"))

    users_with_role = frappe.get_all(
        "Has Role",
        filters={"role": role_name},
        pluck="parent"
    )

    if users_with_role:
        frappe.throw(_("Cannot delete role assigned to users"))

    frappe.delete_doc("Role", role_name, ignore_permissions=True)
    frappe.db.commit()

    return {"message": "Role deleted successfully"}


# ============================================================
# 4️⃣ LIST MODULES (ONLY COMPANY ACCESS)
# ============================================================

@frappe.whitelist()
def list_modules_with_doctypes():
    throw_if_not_admin()

    doctypes = frappe.get_all(
        "DocType",
        filters={
            "module": "Company Access",
            "istable": 0,
            "issingle": 0
        },
        fields=["name", "module"],
        order_by="name asc"
    )

    grouped = {}
    for dt in doctypes:
        grouped.setdefault(dt.module, []).append(dt.name)

    return grouped


# ============================================================
# 5️⃣ GET ROLE PERMISSIONS
# ============================================================

@frappe.whitelist()
def get_role_permissions(role=None):
    throw_if_not_admin()

    if not role:
        frappe.throw(_("Role is required"))

    if not frappe.db.exists("Role", role):
        frappe.throw(_("Role does not exist"))

    allowed_doctypes = frappe.get_all(
        "DocType",
        filters={"module": "Company Access"},
        pluck="name"
    )

    return frappe.get_all(
        "DocPerm",
        filters={
            "role": role,
            "parent": ["in", allowed_doctypes]
        },
        fields=[
            "parent",
            "read",
            "write",
            "create",
            "delete",
            "submit"
        ]
    )


# ============================================================
# 6️⃣ UPDATE DOCTYPE PERMISSION
# ============================================================

@frappe.whitelist()
def update_doctype_permission(
    role=None,
    doctype=None,
    read=0,
    write=0,
    create=0,
    delete=0,
    submit=0
):
    throw_if_not_admin()

    if not role or not doctype:
        frappe.throw(_("Role and DocType are required"))

    if not frappe.db.exists("Role", role):
        frappe.throw(_("Role does not exist"))

    if not frappe.db.exists("DocType", doctype):
        frappe.throw(_("DocType does not exist"))

    dt_module = frappe.db.get_value("DocType", doctype, "module")
    if dt_module != "Company Access":
        frappe.throw(_("Permission editing allowed only for Company Access module"))

    read = cint(read)
    write = cint(write)
    create = cint(create)
    delete = cint(delete)
    submit = cint(submit)

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

    perm.read = read
    perm.write = write
    perm.create = create
    perm.delete = delete
    perm.submit = submit

    perm.save(ignore_permissions=True)
    frappe.db.commit()

    return {"message": "Permissions updated successfully"}