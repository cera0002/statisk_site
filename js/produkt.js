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
        alt="${data.productdisplayname}" class="product_pic" />  
            <p class="sale">SALE | ${data.discount}%</p>
          </div>
        </div>
        <div class="info">
          <p class="product_cat">${data.brandname} | ${data.category}</p>
          <h2 class="product_name_big">${data.productdisplayname} / ${data.basecolour}</h2>
          <p class="price"><span class="important">${data.price},-</p>
          <form class="storrelser">
            <option>40</option>
            <option>41</option>
            <option>42</option>
            <option>43</option>
            <option>44</option>
            <option>45</option>
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
