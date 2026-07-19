function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getCart() {
  try {
    const json_data = localStorage.getItem("cart");
    return JSON.parse(json_data);
  } catch (e) {
    return null;
  }
}

/**
 *
 * @returns {Array}
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

function addProductInCart(productID, amount) {
  try {
    const data = getOrCreateCart();

    if (!Array.isArray(data)) return false;


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

function getTotalProductsInCart() {
  const cart = getOrCreateCart();

  return cart.reduce((acc, current) => {
    return acc + current.amount
  }, 0)

}
