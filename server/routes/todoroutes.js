const express = require("express");
const requireauth = require("../middleware/requireauth");

const {
  listAllTodo,
  getSingleTodo,
  createOneTodo,
  updateOneTodo,
  deleteTodo,
} = require("../controllers/controllers");

const router = express.Router();

// require auth for all Todo routes
router.use(requireauth);

router.get("/", listAllTodo);

router.get("/:id", getSingleTodo);

router.post("/", createOneTodo);

router.put("/:id", updateOneTodo);

router.delete("/:id", deleteTodo);

module.exports = router;
