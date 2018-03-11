const storage = window.localStorage;

export function getUsername() {
    return storage.getItem('username');
}

