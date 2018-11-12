function logout() {
    token = getToken()
    token_clear = localStorage.clear();
    window.location.href = '../index.html'
}
