
export const getLocalToken = () =>
    localStorage.getItem('usertoken');

export const getLocalAuthUserName = () =>
    localStorage.getItem('username');

export const setLocalToken = data => {
    localStorage.setItem('usertoken', data.token);
    localStorage.setItem('username', data.name);
}

export const deleteLocalToken = () => {
    localStorage.removeItem('usertoken');
    localStorage.removeItem('username');
}