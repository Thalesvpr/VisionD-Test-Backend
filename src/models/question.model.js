const mongoose = require('mongoose');
const { encrypt } = require('../shared/security/security');

const QuestionSchema = new mongoose.Schema({
  type: {
    type: Number,
    required: true,
    enum: [0, 1],
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,

  },
  isRequired:{
    type: Boolean,
    default: false
  },
  options: {
    type: [{ type: String }], 
    required: function() { 
      return this.type === 1;
    },
  },
});
QuestionSchema.pre('save', function (next) {
  const question = this;
  question.title = encrypt(question.title)
  question.description = encrypt(question.description)
  question.options = question.options.map(option => encrypt(option))
  next();
});

QuestionSchema.post('findOne', function(doc, next) {
  if (doc) {
      doc.title = decrypt(doc.title);
      doc.description = decrypt(doc.description);
      if (doc.options && Array.isArray(doc.options)) {
          doc.options = doc.options.map(option => decrypt(option));
      }
  }
  next();
});

QuestionSchema.post('find', function(docs, next) {
  if (docs) {
      docs.forEach(doc => {
          doc.title = decrypt(doc.title);
          doc.description = decrypt(doc.description);
          if (doc.options && Array.isArray(doc.options)) {
              doc.options = doc.options.map(option => decrypt(option));
          }
      });
  }
  next();
});


const Question = mongoose.model("Question", QuestionSchema)

module.exports = Question;