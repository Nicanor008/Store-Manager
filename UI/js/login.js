document.getElementById('formLogin').addEventListener('click', formLogin);

// admin login
function formLogin(e) {
    e.preventDefault();
    let url = 'https://nick-storemanager.herokuapp.com/auth/login';

    let email = document.getElementById('user_email').value;
    let password = document.getElementById('user_password').value;

    fetch(url,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Origin': '<origin> | *',
            mode: 'no-cors',
            'Access-Control-Allow-Credentials':'true'
        },
        body:JSON.stringify({email:email, password:password}),
    })
    .then(result =>  result.json().then(data => ({status: result.status, body: data})))
    .then((result) => {
        console.log(result.status);
        if(result.body.role == 'admin'){
            setToken(result)
            window.location.href = 'StoreOwner/home.html'
        }else if(result.status == 404){
            document.getElementById('error-display').innerHTML = result.body.message;
        }
        else if(result.status == 400){
            document.getElementById('error-display').innerHTML = result.body.message;
        }
        else{
            document.getElementById('error-display').innerHTML = "Wrong Login Details";
        }
    })
}

// attendant login
document.getElementById('attendant_Login').addEventListener('click', attendant_Login);

// admin login
function attendant_Login(e) {
    e.preventDefault();
    let url = 'https://nick-storemanager.herokuapp.com/auth/login';

    let email = document.getElementById('user_email').value;
    let password = document.getElementById('user_password').value;

    fetch(url,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Origin': '<origin> | *',
            mode: 'no-cors',
            'Access-Control-Allow-Credentials':'true'
        },
        body:JSON.stringify({email:email, password:password}),
    })
    .then(result =>  result.json().then(data => ({status: result.status, body: data})))
    .then((result) => {
        if(result.body.role == 'attendant'){
            setToken(result)
            window.location.href = 'StoreAttendant/products.html'
        }else if(result.body.message == "Invalid Email address"){
            document.getElementById('error-display').innerHTML = result.body.message;
        }
        else{
            document.getElementById('error-display').innerHTML = "Wrong Login Details";
        }
    })
}
