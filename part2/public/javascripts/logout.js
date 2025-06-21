document.getElementById('logout-button').addEventListener('click', async () => {
    try {
        const res = await fetch('/api/users/logout', {
            method: 'POST',
            credentials: 'include'
        });
            window.location.href = '/index.html';

    } catch (err) {
        window.location = '';
    }
});