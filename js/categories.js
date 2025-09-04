let categoryFilter = document.getElementById('category-filter');
let cartIconCounter = document.querySelector(".cart-icon-counter");
let productsContainer = document.getElementById('products-container');

// Retrieve products from the API: fake store api
const getProducts = async () => {
	try {
		try {
			const response = await fetch('https://fakestoreapi.com/products');
			const data = await response.json();
			return data;
		} catch (error) {
			console.error(error);
			const response = await fetch('http://localhost:3000/products');
			const data = await response.json();
			return data;
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// Global variable to store products data from the API
let products;

// Fetch products and display them
async function getProductsAndDisplay() {
    products = await getProducts();
    displayProducts(products);
    // console.log(products);
    cartIconCounter.textContent = getCartFromLocalStorage().reduce((sum, p) => sum + (p.quantity || 1), 0);
    

}

// initially get alll products
getProductsAndDisplay();

// filtering based on category
function filterProducts(category) {
    if(category == 'All') {
        getProductsAndDisplay();
    } else {
        displayProducts(products.filter((product) => product.category === category));
    }
}

// Get DOM elements

// Display products in the products container DOM
async function displayProducts(productsData) {
    let cart = getCartFromLocalStorage();
    productsContainer.innerHTML = '';
    productsData.forEach((product) => {
        pushProductToDOM(product, cart);
    });
}

myCategories = []
function pushProductToDOM(product, cart) {
    let card = document.createElement('div');
    card.classList.add('product-card');

    let img = document.createElement('img');
    img.src = product.image;
    img.alt = product.title;

    let info = document.createElement('div');
    info.classList.add('product-info');

    let title = document.createElement('h3');
    title.classList.add('product-title');
    title.textContent = product.title;

    let category = document.createElement('p');
    category.classList.add('product-category');
    category.textContent = product.category;

    let price = document.createElement('p');
    price.classList.add('product-price');
    price.textContent = `${product.price} $`;

    let button = document.createElement('button');
    button.classList.add('btn-add-to-cart');
    button.textContent = 'Add to Cart';
    button.addEventListener('click', () => {
        product.quantity = 1;
        addToCart(product, button);
    });

    // check if product already in cart
    if (cart.some(p => p.id === product.id)) {
        add2CartProperties(button);
    }

    info.appendChild(title);
    info.appendChild(category);
    info.appendChild(price);
    info.appendChild(button);

    card.appendChild(img);
    card.appendChild(info);

    productsContainer.appendChild(card);

    card.addEventListener('click', (e) => {
        if (e.target !== button) {
            localStorage.setItem('clickedProduct', JSON.stringify(product));
            window.open('viewProduct.html', '_blank');
        }
    });
}


// Add a product to the cart
function addToCart(product, addToCartButton) {
    let cart = getCartFromLocalStorage();
    product.quantity = 1;
    cart.push(product);
    setCartToLocalStorage(cart);
    console.log('Product added to cart!');
    cartIconCounter.textContent = getCartFromLocalStorage().length;
    swal({
        title: "Product added to cart",
        icon: "success",
        button: "ok",
    });
    add2CartProperties(addToCartButton);
}


function add2CartProperties(addToCartButton) {
    if (addToCartButton) {
        addToCartButton.textContent = 'Added to Cart';
        addToCartButton.disabled = true;
        addToCartButton.style.cursor = 'not-allowed';
        addToCartButton.style.color = 'white';
        addToCartButton.style.backgroundColor = 'green'
        addToCartButton.style.borderColor = 'gray';
        addToCartButton.style.boxShadow = 'none';
        addToCartButton.style.textShadow = 'none';
    }
}

// Get the cart data from local storage
function getCartFromLocalStorage() {
    return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
}

// Set the cart data to local storage
function setCartToLocalStorage(cart) {

    localStorage.setItem('cart', JSON.stringify(cart));
}





let myCart = document.querySelector('.cart-icon');

myCart.addEventListener('click', () => {
    cartIconCounter.textContent = getCartFromLocalStorage().length;
    let newWindow = window.open('cart.html', '_blank');
});

window.addEventListener("DOMContentLoaded", () => {
    cartIconCounter.textContent = getCartFromLocalStorage().reduce((sum, p) => sum + (p.quantity || 1), 0);
});


