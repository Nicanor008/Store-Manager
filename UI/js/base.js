function setToken(result){
   return localStorage.setItem('token', result.body.token)
}

function getToken(){
    token = localStorage.getItem('token');
    return token;
}

