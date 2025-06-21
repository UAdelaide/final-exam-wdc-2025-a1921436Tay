document.getElementById('logout-button').addEventListener('click', async () => {
    try {
        const res = await fetch('/api/users/logout', {
            method: 'POST',
            credentials: 'include'
        });
        if (res.ok) {
            window.location.href = '/';
        } else {
            error.value = 'Error, Logout Failed';
        }
    } catch (err) {
        error.value = 'An error occurred during logout.';
    }
});