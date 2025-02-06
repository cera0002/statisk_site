const productId = new URLSearchParams(window.location.search).get("id");
console.log("product loader...", productId);

let productCard = document.querySelector(".product_container");

fetch(`https://kea-alt-del.dk/t7/api/products/${productId}`)
  .then((response) => response.json())

  .then((data) => {
    productCard.innerHTML = `
    
      <div class="show">
          <h1 class="product_name">${data.productdisplayname}</h1>
          <div class="image_container">
          <img
        src="https://kea-alt-del.dk/t7/images/webp/640/${productId}.webp"
        alt="${data.productdisplayname}" class="product_pic ${data.soldout && "sold_out"}" />  
            <p class="sale_product ${!data.discount && "hide"} ${data.soldout && "hide"}">-${data.discount}%</p>
            <p class="soldout_product  ${!data.soldout && "hide"} ">SOLD OUT</p>
          </div>
          
        </div>
        <div class="info">
          <p class="product_cat">${data.brandname} | ${data.category}</p>
          <h2 class="product_name_big">${data.productdisplayname} / ${data.basecolour}</h2>
           <div class="price_container">
          <p class="price ${data.discount && "original_price"} ${data.soldout && "sold_out"}"><span class="important">${data.price},-</p>
          <p class="new_price ${data.discount && "frem"}">${Math.floor(data.price * (1 - data.discount / 100))},-</p>
          </div>
          <form class="storrelser">
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
          </form>
          <h3 class="kob_cta">BUY NOW</h3>
          <h3 class="features">/ Product description</h3>
          <p class="tekst">${data.description} </p>
           </div>
        `;
  });

////arbejd med htmlstruktur//

document.querySelectorAll("span").forEach((span) => {
  if (span.innerHTML.replace(/&nbsp;/g, "").trim() !== "") {
    span.classList.add("important");
  }
});
