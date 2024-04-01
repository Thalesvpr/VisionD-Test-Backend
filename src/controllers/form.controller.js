
const Form = require('../models/form.model.js');


const getAllForms = async (req, res) => {
  const userId  = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: 'O parametro userId é obrigatório.' });
  }

  try {
    const forms = await Form.find({createdBy: userId});
    res.status(200).json(forms);
  } catch (error) 
  {
    res.status(500).json({ error: 'Erro ao buscar formulários.', type: error });
  }
};


const getFormById = async (req, res) => {

  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ error: 'Formulário não encontrado.' });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar formulario.' });
  }
};
const getFormByIdActive = async (req, res) => {
  try {
    const form = await Form.findOne({ _id: req.params.id, isActive: true });
    if (!form) {
      return res.status(404).json({ error: 'Formulário não encontrado ou não está ativo.' });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar formulário.' });
  }
};



const createForm = async (req, res) => {

  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).json(form);
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateFormById = async (req, res) => {
  try {
    const form = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!form) {
      return res.status(404).json({ error: 'Formulário não encontrado.' });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar formulário.' });
  }
};




module.exports = {
  getFormByIdActive,
  getAllForms,
  getFormById,
  createForm,
  updateFormById,
};
