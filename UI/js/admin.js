token = getToken()

window.onload = function get_products(){

    fetch('https://nick-storemanager.herokuapp.com/products',{
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type':'application/json',
            'Access-Control-Allow-Origin': '*',
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
document.getElementById('add_products').addEventListener('click', post_product);

function post_product(e) {
    e.preventDefault();
    
    let product_name = document.getElementById('product_name').value;
    let product_category = document.getElementById('product_category').value;
    let quantity = document.getElementById('quantity').value;
    let product_price = document.getElementById('product_price').value;

    fetch('https://nick-storemanager.herokuapp.com/products',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization':'Bearer ' + token
        },
        body:JSON.stringify({product_name:product_name, product_category:product_category, product_quantity:quantity, price:product_price})
    })
    .then(result =>  result.json().then(data => ({status: result.status, body: data})))
    .then(result => {
        if(result.status == 201){
            document.getElementById('success-display').innerHTML = "201 - added";
        }else if(result.status == 404){
            document.getElementById('error-display').innerHTML = "404 - all fields are required";
        }else if(result.status == 409){
            document.getElementById('error-display').innerHTML = "409 - duplicate fields";
        }else{
            document.getElementById('error-display').innerHTML = "something wrong happened";
        }
    })
    
}
