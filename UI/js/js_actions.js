
function AddToCart() {
    let userclick = confirm("Do you want to Add to Cart?");
    if (userclick == true) {
       alert('One Product added to Cart');
    }
}


// cart checkout
function CartSellProducts() {
    alert('Products Sold. Receipt Printing.')
}

// cancelling users cart
function CancelCart() {
    let clickconfirm = confirm("Are you sure you want to delete the Cart?");
    if (clickconfirm == true) {
        window.open('home.html', '_SELF');
    }
}

