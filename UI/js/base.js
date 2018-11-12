function setToken(result){
   return localStorage.setItem('token', result.body.token)
}

function getToken(){
    token = localStorage.getItem('token');
    return token;
}

function getRole(){
    token = localStorage.getItem('role');
    return token;
}
