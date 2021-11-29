export const isUserRole = (user, role) => {
    return user != null && user.role === role;
}

export const isUserGuest = (user) => {
    return user === null;
}