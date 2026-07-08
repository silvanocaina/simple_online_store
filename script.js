const token = getToken();

if (token) {
  // se existir um token valido, redirecionar para pagina de produtos
  window.location.href = "pages/products.html";
} else {
  // se não, redirecionar para a pagina de autenticação
  window.location.href = "pages/auth.html";
}
