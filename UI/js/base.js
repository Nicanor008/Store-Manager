function errorNotification(res){
    return `<p>${res.body.error}</p>`;
}

function successNotification(res){
    return `<p>${res.body.success}</p>`;
}

function setToken(result){
   return localStorage.setItem('token', result.body.token)
}

function getToken(){
    token = localStorage.getItem('token');
    return token;
}
