document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Basic validation
    if (!fullName || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Simulate a signup request (replace with actual API call)
    console.log('Signing up:', { fullName, email, password });
    alert('Signup successful!'); // Placeholder for actual response handling
});
