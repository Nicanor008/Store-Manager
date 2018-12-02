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
            let products = result.products;
            let products_table = document.getElementById('products_table');
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
                id = product.productid;
                product_name = product.product_name;
                price = product.price;
                quantity = product.product_quantity;

                products_table.innerHTML += '<tr>'+
                    '<td><input type="text" id="product_id" value="'+id+'" readonly></input></td>'+
                    '<td><input type="text" id="product_name" value="'+product_name+'"></input></td>'+
                    '<td><input type="number" name="price" class="price"  value="'+price+'"></input></td>'+
                    '<td><input type="number" id="quantity" value="'+quantity+'"></input></td>'+
                    '<td><button onclick="edit_product('+id+')">Edit</button>'+
                    '&nbsp;&nbsp;'+
                    '<button onclick="delete_product('+id+')">Delete</button></td>'+
                    '</tr>';
            })
    })
}   

// delete product
function delete_product(id) {
    let url = 'https://nick-storemanager.herokuapp.com/products/'.concat(id);

    fetch(url ,{
        method:'DELETE',
        headers:{
            'Content-type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization':'Bearer ' + token
        }})
    .then(result =>  result.json())
    .then(result => {
        window.location.reload();
    })
}

// Edit a product
function edit_product(id) {
    let price = document.getElementsByName('price').value
    console.log(price)
    let url = 'https://nick-storemanager.herokuapp.com/products/'.concat(id)

    fetch(url ,{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization':'Bearer ' + token
        },
        body:JSON.stringify({product_quantity:quantity, product_name:product_name, price:price, product_category:"product"})
    })
    .then(result =>  result.json().then(data => ({status: result.status, body: data})))
    .then(result => {
        console.log(result) 
        if(result.status == 201){
            document.getElementById('success-display').innerHTML = result.body.message;
            // window.location.reload();
        }else{
            document.getElementById('error-display').innerHTML = result.body.message;
        }
    })
}


// add a product
let add = document.getElementById('add_products');
if(add){
    add.addEventListener('click', post_product);
}
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
        console.log(result.status)
        if(result.status == 201){
            document.getElementById('success-display').innerHTML = result.body.message;
            window.location.reload();
        }else if(result.status == 404){
            document.getElementById('error-display').innerHTML = result.body.message;;
        }else if(result.status == 409){
            document.getElementById('error-display').innerHTML = result.body.message;;
        }else{
            document.getElementById('error-display').innerHTML = "something wrong happened";
        }
    })
}

// add a user
add_user = document.getElementById('add_user').addEventListener('click', post_user);
function post_user(e) {
    e.preventDefault();
    
    let product_name = document.getElementById('username').value;
    let product_category = document.getElementById('email').value;
    let quantity = document.getElementById('password').value;
    let product_price = document.getElementById('role').value;

    fetch('https://nick-storemanager.herokuapp.com/auth/signup',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization':'Bearer ' + token
        },
        body:JSON.stringify({username:product_name, email:product_category, password:quantity, role:product_price})
    })
    .then(result =>  result.json().then(data => ({status: result.status, body: data})))
    .then(result => {
        if(result.status == 201){
            document.getElementById('success-display').innerHTML = result.body.message;
        }else if(result.status == 404){
            document.getElementById('error-display').innerHTML = result.body.message;
        }else if(result.body.message == 'user already exist'){
            document.getElementById('error-display').innerHTML = 'user already exist';
        }else if(result.status == 400){
            document.getElementById('error-display').innerHTML = result.body.message;
        }else{
            document.getElementById('error-display').innerHTML = "something wrong happened";
        }
    })
}

// get all users
window.onload = function get_users(){
    fetch('https://nick-storemanager.herokuapp.com/auth/users',{
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
            let users = result;
            let users_table = document.getElementById('users');
            th = `
                <tr>
                    <th>Employee ID</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Role</th>
                </tr>
            `
            users_table.innerHTML = th
            users.forEach(user => { 
                users_table.innerHTML += '<tr>'+
                    '<td>'+user.employee_no+'</td>'+
                    '<td>'+user.email+'</td>'+
                    '<td>'+user.username+'</td>'+
                    '<td>'+user.role+'</td>'+
                    '</tr>';
            })
    })
}   