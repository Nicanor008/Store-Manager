
// get sale records
window.onload = function get_sales(){

    fetch('https://nick-storemanager.herokuapp.com/auth/sales',{
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
            // console.log(resu lt)
            let products = result;
            let products_table = document.getElementById('sale_table');
            th = `
                <tr>
                    <th>Product ID</th>
                    <th>Sales ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Attended By</th>
                </tr>
            `
            // sale_records_table
            products_table.innerHTML = th
            products.forEach(product => { 
                products_table.innerHTML += '<tr>'+
                    '<td>'+product.product_id+'</td>'+
                    '<td>'+product.sales_id+'</td>'+
                    '<td>'+product.product_name+'</td>'+
                    '<td>'+product.price+'</td>'+
                    '<td>'+product.sold_quantity+'</td>'+
                    '<td>'+product.attended_by+'</td>'+
                    '</tr>';
            })
    })
}

