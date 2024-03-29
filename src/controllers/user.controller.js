
const User = require('../models/user.model.js')
const { decrypt } = require('../shared/security/security.js');
const {getToken} = require('../shared/auth/auth.js')
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }
  

      const passwordMatch = password == decrypt(user.password)
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }
  
      const token = getToken(user)
      const userId = user.id
      console.log(userId)
      const name = user.name

      res.json({ token , userId, name});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocorreu um erro ao fazer login' });
    }
  };




const getAllUsers = async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).json(Users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar Usuario.' });
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario não encontrado' });
    }
    res.status(200).json(User);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar Usuario.' });
  }
};


const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    email = user.email;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: 'Usuário ja cadastrado' });
    }
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar Usuario.' });
  }
};


const updateUserById = async (req, res) => {
  try {
    const User = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!User) {
      return res.status(404).json({ error: 'Usuario não encontrado.' });
    }
    res.status(200).json(User);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar Usuario' });
  }
};

const deleteUserById = async (req, res) => {
    const userId = req.params.id;
  try {
    const User = await User.findByIdAndUpdate(userId, { isActive: false });
    if (!User) {
      return res.status(404).json({ error: 'Usuario não encontrado.' });
    }
    res.status(200).json({ message: 'Usuario excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir Usuario.' });
  }
};




module.exports = {
  login,
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};

