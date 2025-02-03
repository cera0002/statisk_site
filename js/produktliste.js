let listContainer = document.querySelector(".product_list_container");

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

fetch(`https://kea-alt-del.dk/t7/api/products/`)
  .then((response) => response.json())

  .then((data) => showList(data));

function showList(products) {
  console.log(products);
  const markup = products
    .map(
      (product) =>
        ` <div class="product_card">
          <p class="nr">//</p>
          <a href="produkt.html" class="billede"> <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
        alt="${product.productdisplayname}"/>   
          <a href="produkt.html" class="navn">/ ${product.productdisplayname}</a>
          <a href="produkt.html" class="pris">${product.price},-</a>
          <a href="produkt.html" class="add">ADD TO BAG</a>
        </div>`
    )
    .join("");
  listContainer.innerHTML = markup;
}
