const list = document.getElementById("products");
let show_list = [];

start();

async function start() {
  triage(null, "auth.html");

  const products = await get_products();

  if (products) {
    builder_products_list(products);
  } else {
    alert("Deu erro para pegar os produtos no banco de dados");
  }
}

const builder_products_list = (products_list) => {
  list.innerText = "";
  products_list.forEach((item) => {
    // Imagem do Produto
    const product_img_element = document.createElement("img");
    product_img_element.src = item.image;
    product_img_element.alt = item.title;
    product_img_element.className = "product-image";

    // Nome do Produto
    const product_name_element = document.createElement("p");

    product_name_element.innerText = item.title;
    product_name_element.className = "product-name";

    // Preço do Produto

    const product_price_element = document.createElement("p");

    product_price_element.innerText = item.price.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    product_price_element.className = "product-price";

    const ui_element = document.createElement("li");
    ui_element.className = "product-card";

    ui_element.addEventListener("click", () => {
      window.location.href = `product_info.html?id=${item.id}`;
    });

    // Montando o elemento da lista
    ui_element.appendChild(product_img_element);
    ui_element.appendChild(product_name_element);
    ui_element.appendChild(product_price_element);

    list.appendChild(ui_element);
  });

  show_list = products_list;
};
