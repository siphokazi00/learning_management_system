document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            alert('Login successful!');
            window.location.href = '/index.html'; // Redirect to the dashboard
        } else {
            const error = await response.json();
            alert(error.message || 'Login failed. Please try again.');
        }
    } catch (error) {
        alert('An error occurred. Please check your connection.');
    }
});