export const isUserRole = (user, role) => {
    return user != null && user.role === role;
}