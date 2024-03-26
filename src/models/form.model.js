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


  const Form = mongoose.model("Form", FormSchema)

  module.exports = Form;