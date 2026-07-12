// Vamos ser sincero que isso não é nada seguro mas como é um site de exemplo com uma api fake, então não há problemas

/**
 * Define o token para ser armazenado
 * @param {string} token - O token
 */
function setToken(token) {
  const expiration = Date.now() + 24 * 60 * 60 * 1000; // expiração para um dia dps

  const data = {
    token: token,
    expiration: expiration,
  };

  // armazenar nosso token
  localStorage.setItem("auth", JSON.stringify(data));
}

/**
 * Tenta recuperar o token
 * @returns {string|null} - O token ou nulo
 */
function getToken() {
  const data = localStorage.getItem("auth");

  if (!data) return null; // Retorna nulo se estiver ausente

  // tranformar de volta em um objeto
  const obj_data = JSON.parse(data);
  if (Date.now() > obj_data.expiration) {
    // Token expirado, ent remove
    localStorage.removeItem("auth");

    return null; // retornar nulo por esta expirado
  }

  // retornar o token valido
  return obj_data.token;
}

/**
 * Checa se o token é valido
 * @returns {boolean} - Retornar se o token é valido
 */
function isValidToken() {
  const token = getToken();

  return token != null;
}

/**
 * Triar o fluxo depedendo se o token é valido
 * @param {string|null} destination - Destino se o token for valido
 * @param {string} fallback - Fallback se o token não for valido
 */
function triage(destination, fallback) {
  const token = isValidToken();

  if (token) {
    // se existir um token valido, redirecionar para pagina de destino
    if (destination) {
      // verifica se o destino é nulo, isso permite paginas que não precisa redirecionar
      window.location.href = destination;
    }
  } else {
    // se não, redirecionar para a pagina de autenticação
    window.location.href = fallback;
  }
}
