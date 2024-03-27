const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  type: {
    type: Number,
    required: true,
    enum: [0, 1],
  },
  title: {
    type: String,
    required: true,
    validator: (value) => {
      const encrypted = encrypt(value);
      return encrypted;
    },
  },
  description: {
    type: String,
    validator: (value) => {
      const encrypted = encrypt(value);
      return encrypted;
    },
  },
  options: {
    type: [{ type: String }], 
    required: function() { 
      return this.type === 1;
    },
  },
  correctAnswer: { 
    type: String, 
    validator: (value) => {
      const encrypted = encrypt(value);
      return encrypted;
    },
  },
});

const Question = mongoose.model("Question", QuestionSchema)

module.exports = Question;