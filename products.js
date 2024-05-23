document.addEventListener("DOMContentLoaded", function() {
	//Function to update product details based on the product id
	function updateProductDetails(productId) {
		//Update product details based on the product id
		const productImage = document.getElementById("product-image");
		const productName = document.getElementById("product-name");
		const productPrice = document.getElementById("product-price");
		const productDescription = document.getElementById("product-description");
		
		//Update the poduct details based on the product id
		switch (productId){

			case "sapatos1":
				productImage.src = "./PICS/sapatos1.jpeg";
				productName.textContent = "BAPE sta #2 M2 Matte Blue";
				productPrice.textContent = "₱12395";
				break;
				
			case "sapatos2":
				productImage.src = "./PICS/sapatos2.jpeg";
				productName.textContent = "BAPE sta #2 m2 Red";
				productPrice.textContent = "₱11545";
				break;	
				
			case "sapatos3":
				productImage.src = "./PICS/sapatos3.jpeg";
				productName.textContent = "Bape sk8 sta Gray Mismatch";
				productPrice.textContent = "₱17895";
				break;	
			
			case "sapatos4":
				productImage.src = "./PICS/sapatos4.jpeg";
				productName.textContent = "Bape sk8 sta Gray";
				productPrice.textContent = "₱16400";
				break;	
				
			case "hoodie1":
				productImage.src = "./PICS/hoodie1.jpeg";
				productName.textContent = "BAPE Shark Hoodie Full zip camou red";
				productPrice.textContent = "₱21400";
				break;	
				
			case "hoodie2":
				productImage.src = "./PICS/hoodie2.jpeg";
				productName.textContent = "BAPE Shark Hoodie Full zip camou gray";
				productPrice.textContent = "₱19895";
				break;
				
			case "hoodie3":
				productImage.src = "./PICS/hoodie3.jpeg";
				productName.textContent = "BAPE Shark Hoodie Full zip camou blue";
				productPrice.textContent = "₱17895";
				break;
				
			case "hoodie4":
				productImage.src = "./PICS/hoodie4.jpeg";
				productName.textContent = "BAPE Full Zip Hoodie Multicolor";
				productPrice.textContent = "₱22895";
				break;
				
			case "damit1":
				productImage.src = "./PICS/damit1.jpeg";
				productName.textContent = "BAPE Longsleeves Black";
				productPrice.textContent = "₱7895";
				break;
				
			case "damit2":
				productImage.src = "./PICS/damit2.jpeg";
				productName.textContent = "BAPE Printed tee Black";
				productPrice.textContent = "₱11000";
				break;
				
			case "damit3":
				productImage.src = "./PICS/damit3.jpeg";
				productName.textContent = "BAPE Shark Tee Black";
				productPrice.textContent = "₱10295";
				break;
				
			case "damit4":
				productImage.src = "./PICS/damit4.jpeg";
				productName.textContent = "BAPE Printed Tee Black";
				productPrice.textContent = "₱11000";
				break;

			default:
				//Handle unknown product IDs
				break;
		}
		const addToCartButton = document.getElementById("add-to-cart-button");
		addToCartButton.addEventListener("click", addToCart);
		
	}
	
	// Function to handle adding a product to the cart
  function addToCart() {
    // Get the product details from the page
    const productId = getQueryParam("product");
    const productName = document.getElementById("product-name").textContent;
    const productPriceString = document.getElementById("product-price").textContent;
    const quantity = document.getElementById('quantity-input').value;
    const productImageSrc = document.getElementById("product-image").src;

    // Parse the product price as a float
    const productPrice = parseFloat(productPriceString.replace("₱", ""));

    // Create a new cart item object
    const cartItem = {
      id: productId,
      name: productName,
      price: productPrice,
      quantity: parseInt(quantity),
      imageSrc: productImageSrc,
    };

    // Check if the cart array already exists in local storage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(
      (item) => item.id === productId
    );

    if (existingProductIndex !== -1) {
      // If the product is already in the cart, increment the quantity
      cart[existingProductIndex].quantity++;
    } else {
      // If the product is not in the cart, add it
      cart.push(cartItem);
    }

    // Update the local storage with the modified cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // Optionally, you can redirect the user to the cart page or show a confirmation message
    alert("Product added to cart!");
  }

  // Function to handle product clicks
  function handleProductClick(event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag

    // Get the product ID from the data attribute of the clicked element
    const productId = event.target.dataset.productId;

    // Update the URL with the selected product ID
    history.pushState({}, null, `product details.html?product=${productId}`);

    // Update the product details on the page
    updateProductDetails(productId);
  }

  // Attach click event listeners to each product item
  const productItems = document.querySelectorAll(".col-4 img");
  productItems.forEach((item) => {
    item.addEventListener("click", handleProductClick);
  });

  // Call the function to update product details based on the current URL
  const currentProductId = new URLSearchParams(window.location.search).get(
    "product"
  );
  if (currentProductId) {
    updateProductDetails(currentProductId);
  }
});

// Function to get query parameters from the URL
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}
