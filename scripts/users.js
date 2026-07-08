// Vamos ser sincero que isso não é nada seguro mas como é um site de exemplo com uma api fake, então não há problemas
//
function setToken(token) {
  const expiration = Date.now() + 24 * 60 * 60 * 1000; // expiração para um dia dps

  const data = {
    token: token,
    expiration: expiration,
  };

  // armazenar nosso token
  localStorage.setItem("auth", JSON.stringify(data));
}

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
