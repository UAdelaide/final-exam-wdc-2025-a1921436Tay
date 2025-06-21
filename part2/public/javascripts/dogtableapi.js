
  async function fetchAllDogs() {
    try {
      const res = await fetch('/api/dogs');
      if (!res.ok) throw new Error('Failed to fetch dogs');
      const dogs = await res.json();

      const tbody = document.querySelector('#dogTable tbody');
      tbody.innerHTML = '';

      for (const dog of dogs) {
        // Fetch a random dog image
        const imgRes = await fetch('https://dog.ceo/api/breeds/image/random');
        const imgData = await imgRes.json();
        const imgUrl = imgData.message;

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${dog.dog_id}</td>
          <td>${dog.name}</td>
          <td>${dog.size}</td>
          <td><img src="${imgUrl}" alt="Dog" style="height: 100px;"></td>
        `;
        tbody.appendChild(row);
      }
    } catch (err) {
      console.error('Error loading dogs:', err);
    }
  }

  document.addEventListener('DOMContentLoaded', fetchAllDogs);
