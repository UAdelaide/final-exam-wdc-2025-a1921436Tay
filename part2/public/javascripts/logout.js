document.getElementById('logout-button').addEventListener('click', async () => {
    try {
        await fetch('/api/users/logout', {
            method: 'POST',
            credentials: 'include'
        });
            window.location.href = '/index.html';

    } catch (err) {
        error.value = 'An error occurred during login.';
    } finally {
        window.location.href = '/index.html';
    }
});