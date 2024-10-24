document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const defaultUsername = 'clenath3010';
    const defaultPassword = 'clenath3010';

    // Set default username and password if not already set
    if (!localStorage.getItem(defaultUsername)) {
        localStorage.setItem(defaultUsername, defaultPassword);
    }

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Retrieve the stored password for the given username
    const storedPassword = localStorage.getItem(username);

    if (storedPassword && password === storedPassword) {
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
});