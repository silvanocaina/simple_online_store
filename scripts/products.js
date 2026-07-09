const products_base = [];
const locales = [];

async function get_products() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    const obj_response = await response.json();

    return obj_response;
  } catch (e) {
    console.log(`HELPER: products.js deu erro ${e}`);
    return null;
  }
}
