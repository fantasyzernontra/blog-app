export default {
    getToken() {
        if (localStorage && localStorage.getItem('token'))
            return localStorage.getItem('token')
    
        return null
    },
    setToken(token, name, id) {
        if (localStorage && localStorage.getItem('token'))
            return false

        if (localStorage && !localStorage.getItem('token')) {
            localStorage.setItem('token', token)
            localStorage.setItem('author_name', name)
            localStorage.setItem('authorID', id)
        }

        return null
    },
    clearToken() {
        if (localStorage && !localStorage.getItem('token'))
            return false

        if (localStorage && localStorage.getItem('token'))
            localStorage.removeItem('token')

        return null
    }
}