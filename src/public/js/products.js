const socket = io();
const productsContainer = document.getElementById("products-table-body");

socket.on("products", (products) => {
    console.log("hola",products)
  const allProductsElements = products.payload
    .map(
      (product) => `
        <tr>
            <td> ${product.title} </td>
            <td> ${product.description} </td>
            <td> ${product.price} </td>
            <td> <img height="72px" width="72px" src=${product.thumbnail} /> </td>
        </tr>
    `
    )
    .join(" ");
  productsContainer.innerHTML = allProductsElements;
 
  let a = document.createElement('a');
  let linkText = document.createTextNode("atras");
  a.appendChild(linkText);
  a.title = "atras";
  a.href = products.prevLink;
  document.body.appendChild(a);

  let b = document.createElement('a');
  let linkTextSig = document.createTextNode("siguiente");
  a.appendChild(linkTextSig);
  a.title = "siguiente";
  a.href = products.nextLink;
  document.body.appendChild(a);


});
