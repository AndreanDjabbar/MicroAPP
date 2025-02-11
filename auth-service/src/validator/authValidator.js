import { 
    getUserByUsername, 
    getUserByEmail, 
    isPasswordMatch
} from "../services/authServices.js";

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const isValidEmail = (email) => emailPattern.test(email);

const validateRegisterRequest = async (userRegister) => {
    const errors = {};

    if (!userRegister.username || userRegister.username.trim() === '') {
        errors.username = 'Username is required';
    } else if (userRegister.username.length < 6) {
        errors.username = 'Username must be at least 6 characters long';
    } else {
        const existingUserByUsername = await getUserByUsername(userRegister.username);
        if (existingUserByUsername) {
        errors.username = 'Username is already taken';
        }
    }

    if (!userRegister.email || userRegister.email.trim() === '') {
        errors.email = 'Email is required';
    } else if (!isValidEmail(userRegister.email)) {
        errors.email = 'Email must be a valid email address';
    } else {
        const existingUserByEmail = await getUserByEmail(userRegister.email);
        if (existingUserByEmail) {
        errors.email = 'Email is already taken';
        }
    }

    if (!userRegister.password || userRegister.password.trim() === '') {
        errors.password = 'Password is required';
    } else if (userRegister.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    }

    return errors;
};

const validateLoginRequest = async (userLogin) => {
    const errors = {};
    console.log(userLogin.email, userLogin.password);
    let existingUserByEmail = null;

    if (!userLogin.email || userLogin.email.trim() === '') {
        errors.email = 'Email is required';
    } else if (!isValidEmail(userLogin.email)) {
        errors.email = 'Email must be a valid email address';
    } else {
        existingUserByEmail = await getUserByEmail(userLogin.email); 
        if (!existingUserByEmail) {
            errors.email = 'Email not found';
        }
    }

    if (!userLogin.password || userLogin.password.trim() === '') {
        errors.password = 'Password is required';
    } else if (userLogin.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    } else if (existingUserByEmail)  { 
        const isMatch = await isPasswordMatch(userLogin.password, existingUserByEmail.password);
        if (!isMatch) {
            errors.password = 'Invalid password';
        }
    }

    console.log("Errors: ", errors);
    return errors;
};

export {
    validateRegisterRequest,
    validateLoginRequest
}