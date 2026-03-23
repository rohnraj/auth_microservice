import bcrypt from 'bcrypt';
import { createNewUser, getExistingUser } from '../model/userModel.js';
import jwt from 'jsonwebtoken';

const signupController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const userExist = await getExistingUser(email);

        if (userExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        // req.user = { username, email, password: hashedPassword };

        const createUser = await createNewUser(username, email, hashedPassword);

        if (!createUser) {
            return res.status(500).json({ message: 'Error creating user' });
        }

        next();
    } catch (error) {
        console.error('Error in signupController:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = await getExistingUser(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const hashedPassword = user.password; // Assuming the password is stored as a hashed value in the database
        // Compare password
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Attach user info to request object for next middleware
        req.user = { username: user.username, email: user.email};
        next();
    } catch (error) {
        console.error('Error in loginController:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { signupController, loginController };