function authFetch(url, options = {}) {
    const storedUser = localStorage.getItem('user');
    const token = storedUser ? JSON.parse(storedUser).token : null

    return fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token? `Bearer ${token}` : '',
            ...(options.headers || {}),
        }
    })
}

export { authFetch }