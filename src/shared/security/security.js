const crypto = require('crypto');
const Buffer = require('buffer').Buffer;


const key = process.env.SECRET_KEY.toString();
const secretKey = crypto.scryptSync(key, 'salt', 32);
function encrypt(text) {
    const algorithm = 'aes-256-cbc';
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    return iv.toString('hex') + encrypted;
  }

  function decrypt(text) {
    const algorithm = 'aes-256-cbc';
    const iv = Buffer.from(text.substring(0, 32), 'hex');
    const encryptedText = text.substring(32);
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    const decrypted = decipher.update(encryptedText, 'hex', 'utf8') + decipher.final('utf8');
    return decrypted;
  }



  const crypt_middleware = (req, res, next) => {
    const { method, path } = req;
    const originalBody = req.body;
  
    if (!req.body) {
      return res.status(400).send('Requisição sem dados no corpo');
    }

    if (method === 'POST' || method === 'PUT') {
      req.body = encrypt(JSON.stringify(req.body));
    }

  
    next();

    if (res.statusCode === 200) {
      const body = JSON.parse(res.body);
      res.body = decrypt(body);
    }
  };


  module.exports = {decrypt, encrypt};