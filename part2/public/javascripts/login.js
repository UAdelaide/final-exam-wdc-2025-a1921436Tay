const { createApp, ref } = Vue;
// Create Vue application
createApp({
  setup() {
    // form fields and eror message
    const form = ref({ email: '', password: '' });
    const error = ref('');

    // login function on form submit
    async function login() {
      try {
        const res = await fetch('/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form.value)
        });

        const result = await res.json();

        // successful log in handling
        if (!res.ok) {
          error.value = result.error || 'Login failed';
          return;
        }
        // directing user to correct dashboard based on role
        if (result.user.role === 'owner') {
          window.location.href = 'owner-dashboard.html';
        } else if (result.user.role === 'walker') {
          window.location.href = 'walker-dashboard.html';
        }
      } catch (err) {
        // login error message
        error.value = 'An error occurred during login.';
      }
    }

    return { form, error, login };
  }
}).mount('#app');



