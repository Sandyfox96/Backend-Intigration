const jwtAuthMiddleware = (req, res, next) => {
    const token = req.header.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.customer = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid token' });
    }
}

// Genrate key
const genrateToken = (customer) => {
    return jwt.sign(customer, process.env.SECRET_KEY)
}

module.exports = {jwtAuthMiddleware,genrateToken};