document.getElementById('changePasswordForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const username = localStorage.getItem('username');

    if (newPassword !== confirmPassword) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'New passwords do not match.';
        errorMessage.style.display = 'block';
        return;
    }

    try {
        const response = await fetch('https://ruang-bahasa-be2.vercel.app/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, currentPassword, newPassword })
        });

        const result = await response.json();

        if (response.ok) {
            const successMessage = document.getElementById('successMessage');
            successMessage.textContent('Password berhasil diubah.');
            successMessage.style.display = 'block';
            successMessage.classList.add('show');
            window.location.href = 'profile.html';

            // Redirect to login page after 3 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
        } else {
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = result.message || 'Failed to change password.';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
    }
});