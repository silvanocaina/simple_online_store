// Formularios

//formulário de autenticação + botão de mudar para criação de usuário
const auth_user_form = document.getElementById("auth-user-form");
const alt_new_user_button = document.getElementById("alt-new-user-button");

//formulário de criação de usuário + botão de mudar para autenticação de usuário
const new_user_form = document.getElementById("new-user-form");
const alt_auth_user_button = document.getElementById("alt-auth-user-button");

// Colocar o formulário de autenticação como padrão

toggle_form(true);

// Evento dos botões

alt_new_user_button.addEventListener("click", () => toggle_form(false));

alt_auth_user_button.addEventListener("click", () => toggle_form(true));

// Evento dos formularios

new_user_form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const form_data = new FormData(new_user_form);
  const obj = JSON.stringify({
    id: 0,
    ...Object.fromEntries(form_data.entries()),
  });
  console.log(obj);
  try {
    await fetch("https://fakestoreapi.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: obj,
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    alert(
      "Lembre-se que é uma api fake, para se autenticar use usuarios validos abaixo\nUSUARIO: kate_h\nSENHA: kfejk@*_",
    );

    // Alternar para o formulário de autenticação
    toggle_form(true);
  } catch (err) {
    alert("Não foi possivel registrar um novo usuario");
  }
});

auth_user_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form_data = new FormData(auth_user_form);
  const credentials = JSON.stringify(Object.fromEntries(form_data.entries()));
  console.log(credentials);

  try {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: credentials,
    });

    // transformar a resposta do servidor para um objeto
    const obj_response = await response.json();

    // Armazena o token
    setToken(obj_response.token);

    // Redirecionar para pagina index
    window.location.href = "../index.html";
  } catch (err) {
    alert("Não foi possivel se autenticar");
  }
});

// Função para alternar formularios

function toggle_form(isAuth) {
  if (isAuth) {
    new_user_form.style.display = "none";
    alt_auth_user_button.style.display = "none";

    auth_user_form.style.display = "";
    alt_new_user_button.style.display = "";
  } else {
    new_user_form.style.display = "";
    alt_auth_user_button.style.display = "";

    auth_user_form.style.display = "none";
    alt_new_user_button.style.display = "none";
  }
}
