import express from 'express';
import { registerController, loginController, homeController, testResponseController } from '../controllers/authController.js';
const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/getRouter', testResponseController)

// router.get('/home', verifyTokenJWT, homeController);

export {router as authRoutes};