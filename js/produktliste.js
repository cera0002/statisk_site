let productCard = document.querySelector(".product_list_container");

fetch(`https://kea-alt-del.dk/t7/api/products/`).then((response) => response.json())

.then((data) => showList(data));


function showList()
    console.log(products);
    products.map(product=> {
        
    })

}