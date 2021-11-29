export const isUserRole = (user, role) => {
    return user != null && user.role === role;
}

export const isUserGuest = (user) => {
    return user === null;
}

export const isStatusLoading = (status) => {
    return status === 'waiting' || status === 'loading';
}