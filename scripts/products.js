const products_base = [];
const locales = [];

/**
 * Tentar obter a lista de produtos da fakestoreapi
 * @returns {object|null}
 */
async function get_products() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error;
    }

    const obj_response = await response.json();

    return obj_response;
  } catch (e) {
    console.log(`products.js/get_products deu erro ${e}`);
    return null;

  }
}

/**
 * Tentar obter o produto
 * @param {*} id do produto
 * @returns {object|null} O objeto do produto
 */
async function get_single_product(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);

    if (!response.ok) {
      throw new Error;
    }

    const obj_response = await response.json();

    return obj_response;
  } catch (e) {
    console.log(`products.js/get_single_product() deu erro ${e}`);
    return null;
  }
}
