import frappe

@frappe.whitelist(allow_guest=True)
def get_all_users():
    return frappe.get_all('User', 
        fields=['name', 'full_name', 'email', 'enabled'],
        filters={'user_type': 'System User', 'name': ['!=', 'Administrator']}
    )

@frappe.whitelist(allow_guest=True)
def quick_invite(email, first_name, last_name=None):
    user = frappe.get_doc({
        'doctype': 'User',
        'email': email,
        'first_name': first_name,
        'last_name': last_name,
        'send_welcome_email': 1,
        'enabled': 1,
        'roles': [{'role': 'Company Employee'}]
    })
    user.insert(ignore_permissions=True)
    frappe.db.commit()
    return 'Success: Invitation sent to ' + email
