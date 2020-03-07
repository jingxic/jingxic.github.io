// update pillow color
function updateColor(color) {
	var source;
	if (color === 'afterSchoolSpecial'){
		source = "images/detail/afterSchoolSpecial.png";
	} else if (color === 'morningHaze'){
		source = "images/detail/morningHaze.png";
	} else {
		source = "images/detail/cozyDenim.png";
	}

	document.getElementById("colorImage").src = source;
}

// update pillow filling
function updateFilling(filling) {
	var source;
	if (filling === 'duckDown'){
		source = "images/icons/duckDown.png";
	} else if (filling === 'polyBlend'){
		source = "images/icons/polyBlend.png";
	} else {
		source = "images/icons/memoryFoam.png";
	}

	document.getElementById("fillingImage").src = source;
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

    var list = document.getElementById("cartList");
    var newItem = document.createElement("li");
    newItem.appendChild(document.createTextNode(color+"/"+filling
    	+'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0x'+quantity));
    list.appendChild(newItem);    
}

// show items in cart when mouse over 
function showCart() {
	document.getElementById("cartList").style.display = "inline";
}

// show items in cart when mouse out
function hideCart() {
	document.getElementById("cartList").style.display = "none";
}