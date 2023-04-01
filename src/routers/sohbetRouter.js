const sohbetRouter = require("express").Router();
const sohbetController = require("../controllers/sohbetController");


sohbetRouter.get("/",sohbetController.sohbet);

module.exports = sohbetRouter;