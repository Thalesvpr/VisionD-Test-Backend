const QuestionSchema = require('./question.model.js')
const mongoose = require('mongoose')
const FormSchema = new mongoose.Schema({
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
    questions: {
      type: [QuestionSchema],
      required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
  });


  const Form = mongoose.model("Form", FormSchema)

  module.exports = Form;