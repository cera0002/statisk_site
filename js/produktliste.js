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
        ` <div class="product_card">
          <p class="nr">//</p>
          <div class="billede ${product.soldout && "sold_out"}">
            <a href="produkt.html?id=${product.id}">
              <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}"/>
            </a>
          </div>  
          <p class="sale  ${!product.discount && "hide"} ${product.soldout && "hide"}">-${product.discount}%</p>
          <p class="soldout  ${!product.soldout && "hide"} ">SOLD OUT</p>
          <a href="produkt.html?id=${product.id}" class="navn ${product.soldout && "sold_out"}">/ ${product.productdisplayname}</a>
          <a href="produkt.html?id=${product.id}" class="pris ${product.soldout && "sold_out"}">${product.price},-</a>
          <a href="produkt.html?id=${product.id}" class="add ${product.soldout && "sold_out"}">READ MORE</a>
        </div>`
    )
    .join("");
  listContainer.innerHTML = markup;
}
