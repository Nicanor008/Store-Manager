document.getElementById('formLogin').addEventListener('submit', formLogin);

function setToken(res){
    localStorage.setItem("token", res.body.access_token)
}

function getToken(){
    return localStorage.getItem('token')
}

function login_user(e) {
    e.preventDefault();
    let url = 'https://nick-storemanager.herokuapp.com/auth/login';

    let email = document.getElementById('user_email').value;
    let password = document.getElementById('user_password').value;

    fetch(url,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
        },
        body:JSON.stringify({email:email, password:password}),
    })
    .then(res => res.json())
    
    .then((result) => console.log("result"))

}