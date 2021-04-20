export const validateEmail = (email) =>
{
    if(email == ""){
        return "Email is required";
    }
    else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)))
    {
        return "Wrong email format";
    }
    return true;
}

export const validatePassword = (password) =>
{
    if(password == ""){
        return "Password is required";
    }
    else if (!(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[-!#$%&? "]).*$/.test(password)))
    {
        return "Password must be min 8 symbols length and contain at least digit, letter, special char";
    }
    return true;
}

export const validateImageUrl = (url) =>
{
    if(url == ""){
        return "Image is required";
    }
    else if (!(/(https?:\/\/.*\.(?:png|jpg))/.test(url)))
    {
        return "Wrong image format";
    }
    return true;
}
