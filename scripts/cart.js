/**
 * Salvar a lista de produtos no Carrinho
 * @param {Array} cart O Carrinho
 */
function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}


/**
 * Tentar obter o Carrinho
 * @returns {Array|null} Tenta retornar o Carrinho
 */
function getCart() {
  try {
    const json_data = localStorage.getItem("cart");
    return JSON.parse(json_data);
  } catch (e) {
    return null;
  }
}


/**
 * Obtém a lista de produtos do Carrinho ou Criar uma
 * @returns {Array} A Lista de Produtos no Carrinho
 */
function getOrCreateCart() {


  try {

    const obj = getCart();

    if (!obj || !Array.isArray(obj)) throw 'não é array';

    return obj;
  }
  catch (e) {
    setCart(Array.from({}));

    const json_data = getCart();
  return JSON.parse(json_data);
  }

}


/**
 * Tenta adicionar produto no Carrinho
 * @param {string|number} productID ID do Produto
 * @param {number} amount Quantidade a acrescentar
 * @returns {boolean} Se a operação deu certo
 */
function addProductInCart(productID, amount) {
  try {
    const data = getOrCreateCart();

    const index = data.findIndex((value) => { return value.productID == productID });
    if (index != -1) {
      data[index].amount += amount;
    }
    else {

    data.push({ productID: productID, amount: amount });
    }

    setCart(data);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Tentar remover Produto no Carrinho
 * @param {string|number} productID ID do Produto
 * @param {*} amount Quantidade a reduzir
 * @returns
 */
function removeProductInCart(productID, amount) {
  try {
    const data = getOrCreateCart();

    const index = data.findIndex((value) => { return value.productID == productID });

    if (index != -1) { // Se estiver no Carrinho

      // Reduz de forma segura
      if (data[index].amount > amount) {
        // remove uma quantidade
        data[index].amount -= amount;
      } else {
        // remove da lista
        data.splice(index, 1);
    }

    }
    else { // Se não estiver no carrinho
      return false;
    }

    setCart(data);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Obtém a soma total dos Produtos no Carrinho
 * @returns {number} Retornar o total de produtos no Carrinho
 */
function getTotalProductsInCart() {
  const cart = getOrCreateCart();

  return cart.reduce((acc, current) => {
    return acc + current.amount
  }, 0)

}
