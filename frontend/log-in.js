document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://ruang-bahasa-be2.vercel.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (response.ok) {
            // Parse the response to get the user data, including the user ID
            const successMessage = document.getElementById('successMessage');
            successMessage.textContent = 'Login berhasil. Mengarahkan ke halaman utama...';
            successMessage.style.display = 'block';
            successMessage.classList.add('show');

            // Save user_id to localStorage for tracking across pages
            localStorage.setItem('user_id', result.user_id);
            console.log("User ID saved to localStorage:", result.user_id);
            localStorage.setItem('username', username);

            // Redirect to the quiz or dashboard page
            // Redirect to profile page
            setTimeout(() => {
                window.location.href = 'page2.html';
            }, 3000);
        } else {
            // Show error message if username or password is incorrect
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = result.message || 'Username / password salah!';
            errorMessage.style.display = 'block';

            // Hide the error message after 3 seconds
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 3000);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
