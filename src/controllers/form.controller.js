
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
    res.status(500).json({ error: 'Erro ao buscar formulários.' });
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


const createForm = async (req, res) => {

  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).json(form);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar formulário.' });
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



const deleteFormById = async (req, res) => {

    const FormId = req.params.id;
  try {
    const Form = await Form.findByIdAndUpdate(FormId, { isActive: false });

    if (!Form) {
      return res.status(404).json({ error: 'Usuario não encontrado.' });
    }
    res.status(200).json({ message: 'Usuario excluído com sucesso.' });


  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir Usuario.' });
  }
};

module.exports = {
  getAllForms,
  getFormById,
  createForm,
  updateFormById,
  deleteFormById,
};
