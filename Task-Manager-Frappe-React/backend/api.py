import frappe

@frappe.whitelist()
def get_tasks():
    if frappe.session.user == "Guest":
        frappe.throw("Login required")

    return frappe.db.get_list(
        "Task",
        fields=["name", "title", "status", "description", "due_date", "priority"],
        filters={"owner": frappe.session.user},
        order_by="creation desc"
    )


@frappe.whitelist()
def add_task(title, description=None, due_date=None, priority="Medium"):
    if frappe.session.user == "Guest":
        frappe.throw("Login required")

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
    return doc


@frappe.whitelist()
def update_task(name, status):
    doc = frappe.get_doc("Task", name)

    if doc.owner != frappe.session.user:
        frappe.throw("Not permitted")

    doc.status = status
    doc.save()
    return doc


@frappe.whitelist()
def delete_task(name):
    doc = frappe.get_doc("Task", name)

    if doc.owner != frappe.session.user:
        frappe.throw("Not permitted")

    frappe.delete_doc("Task", name)

## CHANGED FOR NEW TASK @MONDAY 26-01-2026