
// headers = (dict(Authorization = 'Bearer ' + self.token_admin)),

window.onload = function get_products(){
    token = getToken()

    fetch('https://nick-storemanager.herokuapp.com/products',{
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type':'application/json',
            'Authorization':'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then((result) => {
            console.log(result)
            let products = result.products;
            let table = document.getElementById('products_table');
            th = `
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</td>
                </tr>
            `
            products_table.innerHTML = th
            products.forEach(product => { 
                products_table.innerHTML += '<tr>'+
                    '<td>'+product.productid+'</td>'+
                    '<td>'+product.product_name+'</td>'+
                    '<td>'+product.price+'</td>'+
                    '<td>'+product.product_quantity+'</td>'+
                    '<td><button id="edit_product">Edit</button>'+
                    '&nbsp;&nbsp;'+
                    '<button id="edit_product">Delete</button></td>'+
                    '</tr>';
            })
    })
}   

// add a product
document.getElementById('myBtn').addEventListener('click', post_product);

function post_product(e) {
    e.preventDefault();

    
}
