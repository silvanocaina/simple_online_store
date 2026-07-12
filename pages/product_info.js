start();

async function start() {
  const url = window.location.search;

  const URLParams = new URLSearchParams(url);

  const product_id = URLParams.get("id");

  if (!product_id) {
    // Se for nulo, ent redirecionamos para pagina de produtos de volta
    window.location.href = "products.html";
  }

  // Tenta obter o produto
  const single_product = await get_single_product(product_id);

  if (single_product) {
    build_product_info(single_product);
  } else {
    alert("Deu erro para pegar o produto especifico no banco de dados");
  }
}

const product_image_element = document.getElementById("product-image");
const product_name_element = document.getElementById("product-name");
const product_description_element = document.getElementById(
  "product-description",
);
const product_price_element = document.getElementById("product-price");
const product_category_element = document.getElementById("product-category");

function build_product_info(single_product) {
  console.log(single_product);

  product_image_element.src = single_product.image;
  product_name_element.innerText = single_product.title;
  product_price_element.innerText = single_product.price.toLocaleString(
    "pt-br",
    {
      style: "currency",
      currency: "BRL",
    },
  );
  product_category_element.innerText = single_product.category;
  product_description_element.innerText = single_product.description;
}
