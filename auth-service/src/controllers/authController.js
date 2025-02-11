import { validateRegisterRequest, validateLoginRequest } from "../validator/authValidator.js";
import { registerUser, loginUser } from "../services/authServices.js";

const registerController = async(req, res) => {
    const userRegister = req.body;
    try {
        const errors = await validateRegisterRequest(userRegister);
        if(Object.keys(errors).length > 0) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: errors,
            });      
        }

        const result = await registerUser(userRegister);
        return res.status(201).json({
            "status": "success",
            "data":{
                "username": result.username,
                "email": result.email
            }
        })
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            "status": "error",
            "message": err
        })
    }
}

const loginController = async(req, res) => {
    const userLogin = req.body;
    try {
        const errors = await validateLoginRequest(userLogin);
        if(Object.keys(errors).length > 0) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: errors,
            });      
        }

        const token = await loginUser(userLogin);
        return res.status(201).json({
            "status": "success",
            "data":{
                "email": userLogin.email,
                "token": token
            }
        })
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            "status": "error",
            "message": err
        })
    }
}
const homeController = async(req, res) => {

}

const testResponseController = async(req, res) => {
    res.status(200).json({
        "test": "Controller"
    })
}

export {
    registerController,
    loginController,
    homeController,
    testResponseController
};