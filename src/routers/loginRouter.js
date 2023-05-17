const loginRouter = require("express").Router();
const loginController = require("../controllers/loginController");

loginRouter.get("/",loginController.login);
loginRouter.delete("/",loginController.logout);
module.exports = loginRouter;