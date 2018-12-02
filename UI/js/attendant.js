token = getToken()

// get products to the user
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
            let products_table = document.getElementById('products_table');
            products.forEach(product => { 
                id = product.productid;
                product_name = product.product_name;
                price = product.price;
                quantity = product.product_quantity;

                if(quantity >= 1){
                    products_table.innerHTML += '<div class="single_product_category">'+
                            '<div class="product_image"><img src="../images/laptop1.jpeg" alt="laptops" width="210" height="137"></div>'+
                            '<div class="product_category_descr">'+product_name+'<br>'+
                            '<button style="float:left;background-color: white;padding: 4px;">Ksh. '+price+'</button>'+
                            '<button style="float:right;background-color: white;padding: 4px;"><b>'+quantity+'</b> Available</button>'+
                                '<br><br>'+
                                '<a href="single_product.html" class="add_to_cart_btn">'+
                                    '<button onclick="show_product('+id+')" id="myBtn">View</button>'+
                                '</a>'+
                                '<button class="add_to_cart_buttons" onclick="postsales('+id+')">Post <b>1</b> Sale</button>'+
                            '</div>'+
                    '</div>'
                }
            })
    })
} 
// onclick="post_sale('+price+','+quantity+')

function postsales(id){
    url = 'https://nick-storemanager.herokuapp.com/sale/'.concat(id);
    // console.log(url)
    fetch(url,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization':'Bearer ' + token
        }
    })
    .then(result =>  result.json().then(data => ({status: result.status, body: data})))
    .then(result => {
        console.log(result)
        if(result.status == 201){
            alert("Sale successfully posted")
            window.location.reload();
        }else if(result.status == 404){
            document.getElementById('error-display').innerHTML = result.body.message;
        }else if(result.status == 413){
            document.getElementById('error-display').innerHTML = result.body.message;
        }else{
            document.getElementById('error-display').innerHTML = "something wrong happened, Try again";
        }
    })
}
// get product display
function show_product(id) {
    url = 'https://nick-storemanager.herokuapp.com/products/'.concat(id);
    fetch(url,{
        method:'GET',
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization':'Bearer ' + token
        },
    })
    .then(result =>  result.json())
    .then(result => {
        localStorage.setItem('product_name', result)
    })
}

function display_product(){
    pr = localStorage.getItem('product_name')
    document.getElementById('display_product').innerHTML = "<b>Product Name  </b>:" + pr;
}

// add_sale
document.getElementById('post_sale').addEventListener('click', add_sale);

function add_sale() {
    // e.preventDefault();
    
    let product_name = document.getElementById('product_name').value;
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
        body:JSON.stringify({product_name:product_name, product_quantity:quantity, price:product_price})
    })
    .then(result =>  result.json().then(data => ({status: result.status, body: data})))
    .then(result => {
        console.log(result);
        // if(result.status == 201){
        //     document.getElementById('success-display').innerHTML = result.body.message;
        // }else{
        //     console.log("failed")
        //     document.getElementById('error-display').innerHTML = result.body.message;
        // }
    })
}
