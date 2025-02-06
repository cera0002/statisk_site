const myCategory = new URLSearchParams(window.location.search).get("category");
console.log("productliste loader...", myCategory);

const overskrift = document.querySelector(".h_category");

// Opdater overskriften med den valgte kategori
if (myCategory) {
  overskrift.textContent = myCategory;
}

let listContainer = document.querySelector(".product_list_container");

let allData;

fetch(`https://kea-alt-del.dk/t7/api/products?category=${myCategory}&limit=30`)
  .then((response) => response.json())
  .then((json) => {
    allData = json;
    showList(allData);
  });

document.querySelectorAll("button").forEach((knap) => knap.addEventListener("click", showFiltered));

function showFiltered() {
  const filter = this.dataset.season;
  if (filter == "All") {
    showList(allData);
  } else {
    fraction = allData.filter((product) => product.season === filter);
    showList(fraction);
  }
}

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
          <div class="price_container">
          <a href="produkt.html?id=${product.id}" class="pris ${product.discount && "original_price"} ${product.soldout && "sold_out"}">${product.price},- </a>
          <a href="produkt.html?id=${product.id}" class="new_price ${product.discount && "frem"}">${Math.floor(product.price * (1 - product.discount / 100))},-</a>
          </div>  
          <a href="produkt.html?id=${product.id}" class="add ${product.soldout && "sold_out"}">READ MORE</a>
        </div>`
    )
    .join("");
  listContainer.innerHTML = markup;
}
