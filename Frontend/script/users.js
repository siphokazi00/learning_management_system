async function getAllUsers() {
    try {
        const response = await fetch('http://localhost:5500/api/users');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();
        console.log(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Call the function to fetch users
getAllUsers();
