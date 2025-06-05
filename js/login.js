const BACKEND_URL = 'https://pime2.up.railway.app';

document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    alert('Preencha usuário e senha');
    return;
  }

  try {
    const response = await fetch(`${BACKEND_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (response.ok) {
      if (result.role === 'admin') {
        window.location.href = 'index.html';
      } else if (result.role === 'cliente') {
        window.location.href = 'restricted.html';
      } else {
        alert('Tipo de usuário desconhecido');
      }
    } else {
      alert(result.message || 'Erro ao fazer login');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro ao conectar ao servidor');
  }
});
