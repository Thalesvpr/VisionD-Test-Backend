const mongoose = require('mongoose');
const { encrypt } = require('../shared/security/security.js');

const AnswerSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true,
  },
  answers: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    answer: { 
      type: String, 
      required: true,
      validator: (value) => {
        const encrypted = encrypt(value);
        return encrypted;
      },
    },
    
  }],
});