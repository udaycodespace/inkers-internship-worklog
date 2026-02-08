import React, { useEffect, useState } from 'react';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ email: '', first_name: '' });

    const fetchUsers = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/method/frappe.handler_admin_bypass.get_all_users');
            const data = await res.json();
            if (data.message) setUsers(data.message);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleInvite = async (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.append('email', formData.email);
        params.append('first_name', formData.first_name);

        try {
            const res = await fetch('http://localhost:8000/api/method/frappe.handler_admin_bypass.quick_invite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params
            });
            if (res.ok) {
                alert('Success: User Invited');
                setFormData({ email: '', first_name: '' });
                fetchUsers();
            }
        } catch (err) {
            alert('Request Sent (Check User List)');
            fetchUsers();
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Inkers AI - Admin Panel</h2>
            <form onSubmit={handleInvite} style={{ marginBottom: '20px' }}>
                <input placeholder='Name' value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} required />
                <input placeholder='Email' type='email' value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required style={{marginLeft: '10px'}} />
                <button type='submit' style={{marginLeft: '10px'}}>Invite User</button>
            </form>
            <table border='1' width='100%'>
                <thead><tr><th>Name</th><th>Email</th><th>Status</th></tr></thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.name}>
                            <td>{u.full_name}</td>
                            <td>{u.email}</td>
                            <td>{u.enabled ? 'Enabled' : 'Disabled'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default AdminUsers;
