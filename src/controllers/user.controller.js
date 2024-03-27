const mongoose = require('mongoose');
const User = mongoose.model('User', require('../models/User.schema'));


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
    const User = await User.findById(req.params.id);
    if (!User) {
      return res.status(404).json({ error: 'Usuario não encontrado.' });
    }
    res.status(200).json(User);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar Usuario.' });
  }
};


const createUser = async (req, res) => {
  try {
    const User = new User(req.body);
    await User.save();
    res.status(201).json(User);
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
    res.status(500).json({ error: 'Erro ao atualizar Usuario.' });
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
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};

