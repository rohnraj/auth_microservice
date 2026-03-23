import express from 'express';
import {signupController, loginController} from '../controllers/authController.js';
import authMiddleware from '../middleware/tokenMiddleware.js';

const router = express.Router();

router.post('/signup', signupController, 
    authMiddleware?.refreshToken, 
    authMiddleware?.getAccessToken, (req, res) => {
        res.status(201).json({ message: 'User created successfully' });
    });
    
router.post('/login', loginController, 
    authMiddleware?.refreshToken, 
    authMiddleware?.getAccessToken, (req, res) => {
        res.status(200).json({ message: 'User logged in successfully' });
    });

export default router;  