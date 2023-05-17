const todolistRouter = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const todolistController = require("../controllers/todoController");




todolistRouter.get("/",authMiddleware,todolistController.todolistGetir);

module.exports = todolistRouter;