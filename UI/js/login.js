document.getElementById('formLogin').addEventListener('submit', formLogin);

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
        if(result.body.message == 'Login successful'){
            setToken(result)
            window.location.href = 'StoreAttendant/home.html'
        }else{
            document.getElementById('error-display').innerHTML = "Wrong Login Details";
        }
    })
}
