
const Answer = require('../models/answer.model')

const createFormAnswers = async (req, res) => {
  const { formId, answers } = req.body;

  if (!formId || !answers || !answers.length) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  const newAnswer = new Answer({ formId, answers });


  try {
    await newAnswer.save();
    res.status(201).json({ message: 'Resposta criada com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar resposta.' });
  }
};


const getAllFormAnswers = async (req, res) => {
    
    const formId  = req.params.formId;

    if (!formId) {
      return res.status(400).json({ error: 'O parametro FormId é obrigatório.' });
    }
  try {
    const answers = await Answer.find({ formId: formId })
    if (!answers.length) {
      return res.status(200).json({ message: 'Nenhuma resposta encontrada.' });
    }
    res.status(200).json({ answers });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar respostas.' });
  }
};

const getFormAnswerById = async (req, res) => {
  const answerId = req.params.answerId;
  const formId = req.params.formId;

  if (!formId) {
    return res.status(400).json({ error: 'Campos FormId obrigatório.' });
  }
  try {
    const answer = await Answer.findById(answerId).populate('formId');
    if (!answer) {
      return res.status(404).json({ error: 'Resposta não encontrada.' });
    }
    res.status(200).json({ answer });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar resposta.' });
  }
};

module.exports = {
    createFormAnswers,
    getAllFormAnswers,
    getFormAnswerById,
};

