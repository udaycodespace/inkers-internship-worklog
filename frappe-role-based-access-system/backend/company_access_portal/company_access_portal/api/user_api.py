import frappe
from frappe import _
from frappe.utils import now_datetime, random_string, validate_email_address
from frappe.utils.password import update_password
from datetime import timedelta


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
# 👤 LIST USERS (ADMIN ONLY)
# ============================================================

@frappe.whitelist()
def list_users():
    throw_if_not_admin()

    return frappe.get_all(
        "User",
        filters={"enabled": 1},
        fields=[
            "name",
            "first_name",
            "last_name",
            "enabled",
            "creation"
        ],
        order_by="creation desc"
    )


# ============================================================
# ➕ CREATE USER (MULTI ROLE SUPPORT)
# ============================================================

@frappe.whitelist()
def create_user(email=None, first_name=None, last_name=None, roles=None):

    throw_if_not_admin()

    # ---------------- Validation ----------------

    if not email:
        frappe.throw(_("Email is required"))

    email = email.strip().lower()

    if not validate_email_address(email, throw=False):
        frappe.throw(_("Invalid email address"))

    if frappe.db.exists("User", email):
        frappe.throw(_("User already exists"))

    if not first_name:
        first_name = email.split("@")[0]

    # ---------------- Create User ----------------

    user = frappe.get_doc({
        "doctype": "User",
        "email": email,
        "first_name": first_name.strip(),
        "last_name": (last_name or "").strip(),
        "enabled": 1,
        "send_welcome_email": 0
    })

    user.insert(ignore_permissions=True)

    # ---------------- Assign Roles ----------------

    if roles:
        if isinstance(roles, str):
            roles = [roles]

        for role in roles:
            if role in ["Administrator", "Guest", "All"]:
                frappe.throw(_("System roles cannot be assigned"))

            if not frappe.db.exists("Role", role):
                frappe.throw(_("Role does not exist"))

            user.add_roles(role)

    # ---------------- Generate Reset Token ----------------

    token = random_string(48)

    frappe.db.set_value("User", user.name, {
        "custom_reset_token": token,
        "custom_reset_token_created_on": now_datetime()
    })

    # ---------------- Build React Reset Link ----------------

    frontend_url = "http://localhost:3000/reset-password"
    reset_link = f"{frontend_url}?token={token}"

    # ---------------- Send Email ----------------

    frappe.sendmail(
        recipients=email,
        subject="Complete Your Registration",
        message=f"""
        <p>Hello {first_name},</p>
        <p>Your account has been created.</p>
        <p>Please click below to set your password:</p>
        <p><a href="{reset_link}">{reset_link}</a></p>
        """,
        now=True,
        header=None,
        add_unsubscribe_link=0
    )

    frappe.db.commit()

    return {"message": "User created and invitation sent successfully"}


# ============================================================
# 🔁 ASSIGN ROLE (ADMIN)
# ============================================================

@frappe.whitelist()
def assign_role(user_email=None, role=None):

    throw_if_not_admin()

    if not user_email or not role:
        frappe.throw(_("User and Role are required"))

    if not frappe.db.exists("User", user_email):
        frappe.throw(_("User does not exist"))

    if role in ["Administrator", "Guest", "All"]:
        frappe.throw(_("Cannot assign system role"))

    if not frappe.db.exists("Role", role):
        frappe.throw(_("Role does not exist"))

    user = frappe.get_doc("User", user_email)
    user.add_roles(role)

    frappe.db.commit()

    return {"message": "Role assigned successfully"}


# ============================================================
# ❌ REMOVE ROLE
# ============================================================

@frappe.whitelist()
def remove_role(user_email=None, role=None):

    throw_if_not_admin()

    if not user_email or not role:
        frappe.throw(_("User and Role are required"))

    if user_email == frappe.session.user and role == "Company Admin":
        frappe.throw(_("You cannot remove your own admin role"))

    user = frappe.get_doc("User", user_email)
    user.remove_roles(role)

    frappe.db.commit()

    return {"message": "Role removed successfully"}


# ============================================================
# 🔐 RESET PASSWORD FROM FRONTEND
# ============================================================

@frappe.whitelist(allow_guest=True)
def reset_password_from_frontend(token=None, new_password=None):

    if not token or not new_password:
        frappe.throw(_("Invalid request"))

    if len(new_password) < 6:
        frappe.throw(_("Password must be at least 6 characters"))

    user_data = frappe.get_all(
        "User",
        filters={"custom_reset_token": token},
        fields=["name", "custom_reset_token_created_on"]
    )

    if not user_data:
        frappe.throw(_("Invalid or expired reset link"))

    user_name = user_data[0]["name"]
    created_time = user_data[0]["custom_reset_token_created_on"]

    if not created_time:
        frappe.throw(_("Invalid or expired reset link"))

    if now_datetime() > created_time + timedelta(minutes=20):
        frappe.throw(_("Reset link expired"))

    try:
        update_password(user_name, new_password)
    except Exception as e:
        frappe.throw(str(e))

    frappe.db.set_value("User", user_name, {
        "custom_reset_token": None,
        "custom_reset_token_created_on": None
    })

    frappe.db.commit()

    return {"message": "Password updated successfully"}


# ============================================================
# 👤 CURRENT USER INFO
# ============================================================

@frappe.whitelist()
def get_current_user_info():

    if frappe.session.user == "Guest":
        frappe.throw(_("Not Logged In"), frappe.PermissionError)

    return {
        "email": frappe.session.user,
        "roles": frappe.get_roles(frappe.session.user)
    }