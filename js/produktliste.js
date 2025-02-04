const myCategory = new URLSearchParams(window.location.search).get("category");
console.log("productliste loader...", myCategory);

const overskrift = document.querySelector(".h_category");

// Opdater overskriften med den valgte kategori
if (myCategory) {
  overskrift.textContent = myCategory;
}

let listContainer = document.querySelector(".product_list_container");

fetch(`https://kea-alt-del.dk/t7/api/products?category=${myCategory}`)
  .then((response) => response.json())

  .then((data) => showList(data));

function showList(products) {
  console.log(products);
  const markup = products
    .map(
      (product) =>
        `
      <div class="product_card ${product.discount && ".sale"}">
          <p class="nr">//</p>
          <a href="produkt.html?id=${product.id}" class="billede"> <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
        alt="${product.productdisplayname}"/>   
          <p class="sale">SALE | ${product.discount}%</p>
          <a href="produkt.html?id=${product.id}" class="navn">/ ${product.productdisplayname}</a>
          <a href="produkt.html?id=${product.id}" class="pris">${product.price},-</a>
          <a href="produkt.html?id=${product.id}" class="add">READ MORE</a>
        </div>`
    )
    .join("");
  listContainer.innerHTML = markup;
}
