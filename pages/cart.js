const list = document.getElementById("cart-card");
let show_list = [];

start();

async function start() {
  triage(null, "auth.html");

  const products = getOrCreateCart();

  if (products) {
    await build_products_of_cart(products);
  } else {
    alert("Deu erro para pegar os produtos no banco de dados");
  }
}
/**
 *
 * @param {Array} products
 */
async function build_products_of_cart(products) {

  resolved_products = await Promise.all(products.map(async (value) => {
    return get_single_product(value.productID);
  }))

  const products_list = resolved_products.map((product) => {

    if (!product) return "";

    return `
    <div class="row">
        <img class="product-image" src="${product.image}"/>
        <div class="product-texts">
            <p class="product-name">${product.title}</p>
            <p class="product-price">${product.price.toLocaleString("pt-br", { style: "currency", currency: "BRL", })}</p>
            <p class="product-category">${product.category}</p>
            <div>
                <button class="green-button" onclick="add(${product.id})" > + </button>
                <button class="red-button"   onclick="reduce(${product.id})"> - </button>
            </div>
        </div>
    </div>`;
  })

  list.innerHTML = products_list.join("");
}

function add(productID) {
  console.log(`Aumentando ${productID}`)
}

function reduce(productID) {
  console.log(`Diminuindo ${productID}`)
}
