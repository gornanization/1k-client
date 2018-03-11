const storage = window.localStorage

export function getUsername () {
    return storage.getItem('username')
}

export function setUsername (username) {
    return storage.setItem('username', username)
}
