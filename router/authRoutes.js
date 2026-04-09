import express from 'express';
import {signupController, loginController} from '../controllers/authController.js';
import authMiddleware from '../middleware/tokenMiddleware.js';
import { getAllUsers } from '../model/userModel.js';

const router = express.Router();

router.post('/signup', signupController, 
    authMiddleware?.getAccessToken,
    authMiddleware?.refreshToken, 
     (req, res) => {
        res.status(201).json({ message: 'User created successfully' });
    }
    );
    
router.post('/login', loginController, 
    authMiddleware?.getAccessToken,
    authMiddleware?.refreshToken, 
     (req, res) => {
        res.status(200).json({ message: 'User logged in successfully' });
    }
);

router.get("/logout", (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        sameSite: 'strict',
    });
    res.clearCookie("refresh_token", {
        httpOnly: true,
        sameSite: 'strict',
    });
    res.status(200).json({ message: 'User logged out successfully' });
});

router.get("/getAllusers", async (req, res) => {
    const allUsers = await getAllUsers();
    res.status(200).json(allUsers);
});

// router.get("/getUserbyId/:id", authMiddleware?.refreshAccessToken ,getUser);
export default router;  