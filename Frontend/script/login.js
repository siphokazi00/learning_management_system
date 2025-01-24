document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Basic validation
    if (!email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Simulate a login request (replace with actual API call)
    console.log('Logging in:', { email, password });
    alert('Login successful!'); // Placeholder for actual response handling
});
