const todoApiRouter = require("express").Router();

const userApiController = require("../controller/userApiController");

const authMiddleware = require("../middlewares/authMiddleware");

todoApiRouter.get("/",authMiddleware,userApiController.todoListGetir);

todoApiRouter.post("/",authMiddleware,userApiController.todoEkle);
todoApiRouter.patch("/",authMiddleware,userApiController.todoGuncelle);
todoApiRouter.delete("/:id",authMiddleware,userApiController.todoSil);

module.exports = todoApiRouter;