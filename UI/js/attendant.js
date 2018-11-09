token = getToken()
// get sale records
window.onload = function get_sales(){

    fetch('https://nick-storemanager.herokuapp.com/sales',{
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
            let products = result;
            let products_table = document.getElementById('sales_table');
            th = `
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Action</td>
                </tr>
            `
            // sale_records_table
            products_table.innerHTML = th
            products.forEach(product => { 
                products_table.innerHTML += '<tr>'+
                    '<td>'+product.product_id+'</td>'+
                    '<td>'+product.product_name+'</td>'+
                    '<td>'+product.price+'</td>'+
                    '<td><a href="edit_product.html"><button id="edit_product">Edit</button></a>'+
                    '&nbsp;&nbsp;'+
                    '<button id="delete_product">Delete</button></td>'+
                    '</tr>';
            })
    })
}

// add_sale
document.getElementById('post_sale').addEventListener('click', add_sale);

function add_sale(e) {
    e.preventDefault();
    
    let product_name = document.getElementById('product_name').value;
    let product_category = document.getElementById('product_category').value;
    let quantity = document.getElementById('quantity').value;
    let product_price = document.getElementById('product_price').value;

    fetch('https://nick-storemanager.herokuapp.com/sales',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization':'Bearer ' + token
        },
        body:JSON.stringify({product_name:product_name, product_category:product_category, 
                            product_quantity:quantity, price:product_price})
    })
    .then(result =>  result.json().then(data => ({status: result.status, body: data})))
    .then(result => {
        console.log(result);
    })
}

// to be used later
// // logout   
// let logout = document.getElementById('logout');
// if(logout){
//     logout.addEventListener('click', logout_user);
// }
// function logout_user(e) {
//     res = localStorage.removeItem('token')
//     console.log(res)
//     localStorage.clear();
//     console.log("ssdasdas")
//     window.location.href = 'index.html'
// }