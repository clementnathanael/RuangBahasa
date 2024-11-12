document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            // Display success message
            const successMessage = document.getElementById('successMessage');
            successMessage.textContent = 'Signup successful! Redirecting to login...';
            successMessage.style.display = 'block';
            successMessage.classList.add('show');

            // Redirect to login page after 3 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
        } else if (response.status === 409) {
            // Username already exists
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = 'Username already exists';
            errorMessage.style.display = 'block';
            errorMessage.classList.add('show');

            // Hide the error message after 3 seconds
            setTimeout(() => {
                errorMessage.style.display = 'none';
                errorMessage.classList.remove('show');
            }, 3000);
        } else {
            // Show general error message
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = 'Error signing up';
            errorMessage.style.display = 'block';

            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 3000);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
