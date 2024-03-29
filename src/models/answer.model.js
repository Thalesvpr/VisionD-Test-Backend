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
    },
    
  }],
})

AnswerSchema.pre('save', function(next) {
  const answer = this;
  answer.answers.forEach(ans => {
    ans.answer = encrypt(ans.answer);
  })
  next()
})
const Answer = mongoose.model("Answer", AnswerSchema)

module.exports = Answer;
