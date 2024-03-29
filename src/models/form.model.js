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
  FormSchema.post('findOne', async function(doc, next) {
    if (doc) {
        // Descriptografa o título e a descrição do formulário
        doc.title = decrypt(doc.title);
        doc.description = decrypt(doc.description);

        // Descriptografa as perguntas individuais
        await Promise.all(doc.questions.map(async question => {
            question.title = decrypt(question.title);
            question.description = decrypt(question.description);
            if (question.options && Array.isArray(question.options)) {
                question.options = question.options.map(option => decrypt(option));
            }
            return question;
        }));
    }
    next();
});

// FormSchema.post('find', async function(docs, next) {
//     if (docs) {
//         // Descriptografa o título e a descrição de cada formulário
//         await Promise.all(docs.map(async doc => {
//             doc.title = decrypt(doc.title);
//             doc.description = decrypt(doc.description);

//             // Descriptografa as perguntas individuais de cada formulário
//             await Promise.all(doc.questions.map(async question => {
//                 question.title = decrypt(question.title);
//                 question.description = decrypt(question.description);
//                 if (question.options && Array.isArray(question.options)) {
//                     question.options = question.options.map(option => decrypt(option));
//                 }
//                 return question;
//             }));
//             return doc;
//         }));
//     }
//     next();
// });

//   FormSchema.post('findOne', function(doc, next) {
//     if (doc) {
//         doc.title = decrypt(doc.title);
//         doc.description = decrypt(doc.description);
        
//     }
//     next();
// });

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