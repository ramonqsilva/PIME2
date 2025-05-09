// Evento de submissão do formulário
document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();  // Impede o comportamento padrão do form

  // Pegando os valores dos campos
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Enviar os dados para o backend (Node.js com Express)
  try {
    const response = await fetch('http://localhost:3000/login', {  // Altere a URL conforme o seu backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    // Verifica se o login foi bem-sucedido
    if (response.ok) {
      // Redireciona dependendo do tipo de usuário (admin ou cliente)
      if (result.role === 'admin') {
        window.location.href = 'index.html';  // Para admins
      } else if (result.role === 'cliente') {
        window.location.href = 'restricted.html';  // Para clientes
      }
    } else {
      alert(result.message || 'Erro ao tentar fazer login');
    }
  } catch (error) {
    console.error('Erro na requisição', error);
    alert('Erro ao conectar ao servidor');
  }
});
