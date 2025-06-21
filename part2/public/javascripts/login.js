const { createApp, ref } = Vue;

createApp({
  setup() {
    const form = ref({ email: '', password: '' });
    const error = ref('');

    async function login() {
      try {
        const res = await fetch('/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form.value)
        });

        const result = await res.json();

        if (!res.ok) {
          error.value = result.error || 'Login failed';
          return;
        }

        if (result.user.role === 'owner') {
          window.location.href = 'owner-dashboard.html';
        } else if (result.user.role === 'walker') {
          window.location.href = 'walker-dashboard.html';
        }
      } catch (err) {
        error.value = 'An error occurred during login.';
      }
    }

    return { form, error, login };
  }
}).mount('#app');