//import the model
const AppTodo = require("../models/models");


exports.createOneTodo = (req, res) => {
  const {title,description} =req.body;
  const user_id= req.user._id;
  AppTodo.create({title, description, user_id})
    .then((todo) => {
      console.log({ todo });
      res.json({ 
        message: "You have succesfully added TODO",
        todo,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Sorry your todo list cannot be added",
        error: err.message,
      });
    })
}

exports.listAllTodo = (req, res) => {
  const user_id= req.user._id;
  AppTodo.find({ user_id })
    .then((todo) => {
      console.log({ todo });
      res.json(todo);
    })
    .catch((err) => {
      res.status(404).json({ 
        message: "There isn't any todo available",
        error: err.message
      })
    })
};

exports.getSingleTodo = (req, res) =>{
  AppTodo.findById(req.params.id)
  .then((todo) => {res.json(todo);
  console.log(`This is the requested todo: ${todo}`)})
  .catch((err) => res.status(404).json({ message: "No item found"}))
}

exports.updateOneTodo = (req, res) => {
  AppTodo.findByIdAndUpdate(req.params.id, req.body) 
    .then((todo) => {
      console.log({ todo });
      console.log(`este es el req bodyy: ${req.body}`)
      return res.json({
        message: "You have succesfully updated TODO",
        todo
      })
    })
    .catch((err) => {
      res.status(404).json({
        message: "Sorry your todo list cannot be updated",
        error: err.message,
      });
    })
}

exports.deleteTodo = (req, res) => {
  AppTodo.findByIdAndRemove(req.params.id, req.body)
    .then((todo) => {
      console.log({ todo });
      res.json({
        message: "You have successfully deleted your TODO",
        todo,
      })
    })
    .catch((err) => {
      res.status(404).json({
        message: "Sorry, your todo cannot be deleted",
        error: err.message,
      })
    })
}