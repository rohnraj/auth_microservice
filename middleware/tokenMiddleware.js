import jwt from 'jsonwebtoken';


const getAccessToken = (req, res, next) => {
    const { id, username, email, password } = req.user;
    const token = jwt.sign({ id, username, email, password }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('access token generated:', token);
    
    res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000 // 1 hour
    })

    next();
};

const refreshToken = (req, res, next) => {
    const { id, username, email, password } = req.user;
    const token = jwt.sign({ id, username, email, password }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.cookie("refresh_token", token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    next();
}


const refreshAccessToken = (req, res, next) => {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const { username, email, password } = decoded;

        const newAccessToken = jwt.sign({ username, email, password }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.cookie("access_token", newAccessToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        res.status(200).json({ message: 'Access token refreshed successfully' });
        next();
    } catch (error) {
        console.error('Error refreshing access token:', error);
        return res.status(401).json({ message: 'Invalid refresh token' });
    }
};

export default { getAccessToken, refreshToken, refreshAccessToken };
