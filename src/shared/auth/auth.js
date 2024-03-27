
const jwt = require('jsonwebtoken');
function auth(req, res, next) {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
  
    try {
        req.userId = jwt.verify(token, 'secret').id;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  }


module.exports = {auth};
