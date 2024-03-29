const { encrypt , decrypt} = require('../shared/security/security.js');
const Question= require('./question.model.js')
const mongoose = require('mongoose')
const FormSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    questions: {
      type: [Question.schema],
      ref: 'Question',
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

  FormSchema.pre('save', function (next) {
    const form = this;
    form.title = encrypt(form.title)
    form.description = encrypt(form.description)

      next()
  });
  FormSchema.post('findOne', function(doc, next) {
    if (doc) {
        doc.title = decrypt(doc.title);
        doc.description = decrypt(doc.description);
    }
    next();
});

FormSchema.post('find', function(docs, next) {
    if (docs) {
        docs.forEach(doc => {
            doc.title = decrypt(doc.title);
            doc.description = decrypt(doc.description);
        });
    }
    next();
});

  const Form = mongoose.model("Form", FormSchema)

  module.exports = Form;