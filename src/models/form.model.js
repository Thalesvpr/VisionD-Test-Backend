const QuestionSchema = require('./question.model.js')
const FormSchema = new mongoose.Schema({
    titulo: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
    },
    questoes: {
      type: [QuestionSchema],
      required: true,
    },
  });

  
module.exports = FormSchema;