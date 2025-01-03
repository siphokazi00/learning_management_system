document.addEventListener('DOMContentLoaded', async () => {
    const paymentTableBody = document.querySelector('#paymentTable tbody');
    try {
      const response = await fetch('/api/payments', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const payments = await response.json();
      paymentTableBody.innerHTML = payments
        .map(payment => `
          <tr>
            <td>${payment.user_name}</td>
            <td>${payment.amount}</td>
            <td>${payment.status}</td>
            <td>
              <button onclick="markAsPaid('${payment.id}')">Mark as Paid</button>
            </td>
          </tr>
        `)
        .join('');
    } catch (err) {
      console.error('Error fetching payments:', err);
    }
  });
  
  async function markAsPaid(paymentId) {
    try {
      await fetch(`/api/payments/${paymentId}/mark-paid`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      location.reload();
    } catch (err) {
      console.error('Error updating payment status:', err);
    }
  }  