document.addEventListener('DOMContentLoaded', async () => {
    const paymentTableBody = document.querySelector('#paymentTable tbody');
    
    try {
        // Fetch payments from the API
        const response = await fetch('/api/payments', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch payments: ${response.statusText}`);
        }

        const payments = await response.json();

        // Populate the payment table
        paymentTableBody.innerHTML = payments
            .map(payment => `
                <tr>
                    <td>${payment.user_name}</td>
                    <td>${payment.amount.toFixed(2)}</td>
                    <td class="${payment.status === 'Paid' ? 'status-paid' : 'status-unpaid'}">${payment.status}</td>
                    <td>
                        ${
                            payment.status === 'Paid'
                                ? `<span class="status-indicator">✔️ Paid</span>`
                                : `<button class="btn btn-mark-paid" onclick="markAsPaid('${payment.id}')">Mark as Paid</button>`
                        }
                    </td>
                </tr>
            `)
            .join('');
    } catch (err) {
        console.error('Error fetching payments:', err);
        paymentTableBody.innerHTML = `
            <tr>
                <td colspan="4" class="error-message">Failed to load payments. Please try again later.</td>
            </tr>
        `;
    }
});

async function markAsPaid(paymentId) {
    try {
        // Show a confirmation dialog before marking as paid
        const confirmAction = confirm('Are you sure you want to mark this payment as paid?');
        if (!confirmAction) return;

        const response = await fetch(`/api/payments/${paymentId}/mark-paid`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to update payment status: ${response.statusText}`);
        }

        alert('Payment marked as paid successfully!');
        location.reload();
    } catch (err) {
        console.error('Error updating payment status:', err);
        alert('Failed to update payment status. Please try again later.');
    }
}