// update pillow color
function getColorImage(color) {
	var source;
	if (color === 'After School Special'){
		source = "images/detail/afterSchoolSpecial.png";
	} else if (color === 'Morning Haze'){
		source = "images/detail/morningHaze.png";
	} else {
		source = "images/detail/cozyDenim.png";
	}
	return source;
}


function getFillingImage(filling) {
	var source;
	if (filling === 'Duck Down'){
		source = "images/icons/duckDown.png";
	} else if (filling === 'Poly Blend'){
		source = "images/icons/polyBlend.png";
	} else {
		source = "images/icons/memoryFoam.png";
	}
	return source;
}

function updateColor(color) {
	var source = getColorImage(color);

	document.getElementById("colorImage").src = source;
}

// update pillow filling
function updateFilling(filling) {
	var source = getFillingImage(filling);

	document.getElementById("fillingImage").src = source;
}


function Item(color, filling, quantity) {
  this.color = color;
  this.filling = filling;
  this.quantity = quantity;
  this.colorImage = getColorImage(color);
  this.fillingImage = getFillingImage(filling);
}



// add items to cart and generate a notification
function addToCart() {
	document.getElementById("cartNotification").innerHTML="New items have been added to your cart!"
														  +"<br>"+"Hover over your cart to see.";

	var color;
	var filling;
	var quantity;

	if (document.getElementById('afterSchoolSpecial').checked) {
		color = 'After School Special';
	} else if (document.getElementById('morningHaze').checked) {
		color = 'Morning Haze';
	} else {
		color = 'Cozy Denim';
	}

	if (document.getElementById('duckDown').checked) {
		filling = 'Duck Down';
	} else if (document.getElementById('polyBlend').checked) {
		filling = 'Poly Blend';
	} else {
		filling = 'Memory Foam';
	}

	quantity = document.getElementById('quantityInput').value;

	var newItem = new Item(color,filling,quantity);

	if (localStorage.getItem("cartItems") === null) {
		localStorage.setItem("cartItems", JSON.stringify([]));
	}

	var cartItems = JSON.parse(localStorage.getItem("cartItems"));
	cartItems.push(newItem);
	localStorage.setItem("cartItems", JSON.stringify(cartItems));

	console.log("setItem"+cartItems.length);
	// for detail page
    var listDetail = document.getElementById("cartListDetail");
    var newItemDetail = document.createElement("li");
    newItemDetail.appendChild(document.createTextNode(color+"/"+filling
    	+'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0x'+quantity));
    listDetail.appendChild(newItemDetail);    
}


function deleteFromCart(i) {
	var cartItems = JSON.parse(localStorage.getItem("cartItems"));
	if (i < cartItems.length){
		cartItems.splice(i,1);
	}
	localStorage.setItem("cartItems", JSON.stringify(cartItems));

	cartLoad();
}

function cartLoad() {
	var	cart = document.getElementById("cart-content");


	var child = cart.lastElementChild;  
        while (child) { 
            cart.removeChild(child); 
            child = cart.lastElementChild; 
        } 

	var currentItem;
	var cartItems = JSON.parse(localStorage.getItem("cartItems"));

	// console.log("#items: "+cartItems.length);

	for (i = 0; i < cartItems.length; i++) {
		currentItem = cartItems[i];

		// set title
		var ItemDescription = document.createElement("h3");
		ItemDescription.textContent = currentItem.color+"/"+currentItem.filling+"/"+currentItem.quantity;

		// set image
		var itemImage = document.createElement("img");
		itemImage.setAttribute("src", currentItem.colorImage);
		itemImage.setAttribute("class", "thumbnail");

		// set delete button
		var itemDelete = document.createElement("button");
		itemDelete.textContent = "Delete";
		itemDelete.setAttribute('value',i);

		itemDelete.addEventListener("click", function() {
			var cartItems = JSON.parse(localStorage.getItem("cartItems"));
			// console.log(this.value);
			cartItems.splice(Number(this.value),1);
			localStorage.setItem("cartItems", JSON.stringify(cartItems));

			cartLoad();
		});

		// append them
		cart.appendChild(ItemDescription);
		cart.appendChild(itemImage);
		cart.appendChild(itemDelete);


                                        // Append the text to <p>
	}
}

// show items in cart when mouse over 
function showCart() {
	document.getElementById("cartListDetail").style.display = "inline";
}

// show items in cart when mouse out
function hideCart() {
	document.getElementById("cartListDetail").style.display = "none";
}