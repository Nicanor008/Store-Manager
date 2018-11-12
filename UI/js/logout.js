function logout() {
    token = getToken()
    token_clear = localStorage.clear();
    window.location.replace('../index.html')

}