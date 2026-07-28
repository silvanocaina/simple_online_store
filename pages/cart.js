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

  if (products.length > 0) {

    const price_format = (price) => price.toLocaleString("pt-br", { style: "currency", currency: "BRL", });

    // Acumular o preço dos produtos
    let total_price = 0;

  resolved_products = await Promise.all(products.map(async (value) => {
    return get_single_product(value.productID)
  }))

  const products_list = resolved_products.map((product) => {

    if (!product) return "";

    const inCart = products.find(value => {
      return value.productID == product.id;
    }).amount;

    // Acrescentar o valor no total de produtos
    total_price += product.price * inCart;

    return `
    <div class="row">
        <img class="product-image" src="${product.image}"/>
        <div class="product-texts">
            <p class="product-name">${inCart}x ${product.title}</p>
            <div class="pair-texts">
              <div class="product-prices">
                <p class="product-price product-total-price ">total: ${price_format(product.price * inCart)}</p>
                <p class="product-price product-unit-price ">unidade: ${price_format(product.price)}</p>
              </div>
              <p class="product-category">${product.category}</p>
            </div>
            <div>
                <button class="green-button" onclick="add(${product.id})" > + </button>
                <button class="red-button"   onclick="reduce(${product.id})"> - </button>
            </div>
        </div>
    </div>`;
  })

    list.innerHTML = `<div id="product-list">
    ${products_list.join("")}
    </div>
    <div>
     <p class="product-price">${price_format(total_price)}</p>
      <button class="green-button" onclick="buy()">Comprar</button>
    </div>`;
  }
  else {
    list.innerHTML = `
      <div class="none-products">
      <p> Não há produtos aqui :(</p>
      <p> que tal dar uma olhadinha em produtos</p>
      <button class="neutral-button" onclick="back_button()">Ver produtos</button>
      </div>
      `;
  }
}

function add(productID) {
  console.log(`Aumentando ${productID}`)
  addProductInCart(productID, 1)
  build_products_of_cart(getOrCreateCart())
}

function reduce(productID) {
  console.log(`Diminuindo ${productID}`)
  removeProductInCart(productID, 1)
  build_products_of_cart(getOrCreateCart())
}

function buy() {
  alert("Compra realizada")

  // Zera o carrinho após a compra
  setCart([]);

  build_products_of_cart(getOrCreateCart())
}

function back_button() {
  window.location.href = "products.html"
}
