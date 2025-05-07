document.getElementById('form-login').addEventListener('submit', function(event) {
  event.preventDefault();
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;

  if (usuario === 'laradm' && senha === 'laradm') {
    localStorage.removeItem('idPacienteSelecionado');
    window.location.href = 'index.html';
  } else if (usuario === 'cliente' && senha === 'acessocliente') {
    window.location.href = 'restrito.html';
  } else {
    alert('Nome de usuário ou senha incorretos. Por favor, tente novamente.');
  }
});
