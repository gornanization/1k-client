const storage = window.sessionStorage

export function getUsername () {
    return storage.getItem('username')
}

export function setUsername (username) {
    return storage.setItem('username', username)
}
