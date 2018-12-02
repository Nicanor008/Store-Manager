function logout() {
    token = getToken()
    localStorage.removeItem(token)
    window.open('../index.html')
}
