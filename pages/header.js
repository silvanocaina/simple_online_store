const name_element = document.getElementById('username');


if (name_element) {

  name_element.innerText = getUsername()
}

function uptade_cart_info() {
  const totalProductsInCart = getTotalProductsInCart();
  cart.innerText = `🛒 ${totalProductsInCart < 100? totalProductsInCart : '99+'}`

  cart.style.display = totalProductsInCart > 0 ? "" : "none";
}

const cart = document.getElementById('cart-button')
if (cart) {


  // Adicionar evento de click para o botão de carrinho, onde redirecionar para página de carrinho
  cart.addEventListener('click', () => {
    // triar para página de carrinho se a autenticação for valida
    triage('cart.html', 'auth.html')
  })

  uptade_cart_info()
}
