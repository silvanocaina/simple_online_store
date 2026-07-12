const products_base = [];
const locales = [];

/**
 * Tentar obter a lista de produtos da fakestoreapi
 * @returns {object|null}
 */
async function get_products() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    const obj_response = await response.json();

    return obj_response;
  } catch (e) {
    console.log(`products.js/get_products deu erro ${e}`);
    return null;
  }
}

async function get_single_product(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);

    const obj_response = await response.json();

    return obj_response;
  } catch (e) {
    console.log(`products.js/get_single_product() deu erro ${e}`);
    return null;
  }
}
