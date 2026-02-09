const jwt = require('jsonwebtoken'); 

async function isAuth (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
        const userId = decodedToken.userId; 
        req.auth = { userId }
        next(); 
    }
    catch (err){
        res.status(401).json({ message : 'unauthorized'})
    }
}

module.exports = isAuth