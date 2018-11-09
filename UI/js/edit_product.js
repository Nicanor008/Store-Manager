window.load = function() {
    fetch('https://nick-storemanager.herokuapp.com/products/<prodid>',{
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
        res = document.getElementById('edit_product');
        res.innerHTML = "result"
        console.log(result)
    })
}