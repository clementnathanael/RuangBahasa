document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            // Redirect to page2.html if credentials are correct
            window.location.href = 'page2.html';
        } else {
            // Show error message if username or password is incorrect
            const errorMessage = document.getElementById('errorMessage');
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
    }
});