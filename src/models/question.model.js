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
  },
  description: {
    type: String,
  },
  options: {
    type: [{ type: String }], 
    required: function() { 
      return this.type === 1;
    },
  },
});

const Question = mongoose.model("Question", QuestionSchema)
