document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, email, password }),
        });

        if (response.ok) {
            alert('Sign-up successful! Please log in.');
            window.location.href = 'payments.html'; // Redirect to the login page
        } else {
            const error = await response.json();
            alert(error.message || 'Sign-up failed. Please try again.');
        }
    } catch (error) {
        alert('An error occurred. Please check your connection.');
    }
});