import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET); // attach user info to the request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'Access Denied' });
    }
};