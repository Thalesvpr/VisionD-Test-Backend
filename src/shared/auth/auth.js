
const jwt = require('jsonwebtoken');

const  verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
  
    try {
        req.userId = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET).id;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  }

const getToken = (User) => {
    const token = jwt.sign({ id: User.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  
    return token
};




module.exports = {verifyToken, getToken};
