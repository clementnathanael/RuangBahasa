document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'Passwords do not match.';
        errorMessage.style.display = 'block';
        errorMessage.classList.add('show');

        // Hide the error message after 3 seconds
        setTimeout(() => {
            errorMessage.style.display = 'none';
            errorMessage.classList.remove('show');
        }, 3000);
        return;
    }

    try {
        const response = await fetch('https://ruangbahasa-be.vercel.app/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const responseData = await response.json();  // Parse response JSON

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
        } else {
            // Display backend error message, if available
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = responseData.message || 'Signup failed. Please try again.';
            errorMessage.style.display = 'block';
            errorMessage.classList.add('show');

            // Hide the error message after 3 seconds
            setTimeout(() => {
                errorMessage.style.display = 'none';
                errorMessage.classList.remove('show');
            }, 3000);
        }
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'An error occurred. Please try again.';
        errorMessage.style.display = 'block';
        errorMessage.classList.add('show');

        // Hide the error message after 3 seconds
        setTimeout(() => {
            errorMessage.style.display = 'none';
            errorMessage.classList.remove('show');
        }, 3000);
    }
});
