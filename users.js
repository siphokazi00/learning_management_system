document.addEventListener('DOMContentLoaded', async () => {
    const userTableBody = document.querySelector('#userTable tbody');
    try {
      const response = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const users = await response.json();
      userTableBody.innerHTML = users
        .map(user => `
          <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
              <button onclick="deleteUser('${user.id}')">Delete</button>
            </td>
          </tr>
        `)
        .join('');
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  });
  
  async function deleteUser(userId) {
    try {
      await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      location.reload();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  }  