const mongoose = require("mongoose");
mongoose.set('strictQuery', false)

const TodoListSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
  },
  date:{
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: String,
    required: true
  }
})

const Todo = mongoose.model("todo", TodoListSchema);

module.exports = Todo;