document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if the username already exists
    if (localStorage.getItem(username)) {
        // Show error message if username already exists
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.style.display = 'block';
        errorMessage.classList.add('show');
        
        // Hide the error message after 3 seconds
        setTimeout(() => {
            errorMessage.style.display = 'none';
            errorMessage.classList.remove('show');
        }, 3000);
    } else {
        // Save the user data (for simplicity, we'll use localStorage)
        localStorage.setItem(username, password);

        // Display success message
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
        successMessage.classList.add('show');

        // Hide the success message after 3 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
            successMessage.classList.remove('show');
        }, 3000);

        // Redirect to login page after 3 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000);
    }
});