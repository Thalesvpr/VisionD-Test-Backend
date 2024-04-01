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
  // chat gpt: aqui tem que colocar um pra quando for fazer o opdate com Form.findByIdAndUpdate
  FormSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate(); // Obtém os dados de atualização
    if (update.title) {
        update.title = encrypt(update.title);
    }
    if (update.description) {
        update.description = encrypt(update.description);
    }
    if (update.questions) {
        update.questions.forEach(question => {
            if (question.title) {
                question.title = encrypt(question.title);
            }
            if (question.description) {
                question.description = encrypt(question.description);
            }
            if (question.options && Array.isArray(question.options)) {
                question.options = question.options.map(option => encrypt(option));
            }
        });
    }
    next();
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
          // console.log("------------")
          // console.log(doc.title)
            doc.title = decrypt(doc.title);
            doc.description = decrypt(doc.description);
        });
    }
    next();
});

  const Form = mongoose.model("Form", FormSchema)

  module.exports = Form;