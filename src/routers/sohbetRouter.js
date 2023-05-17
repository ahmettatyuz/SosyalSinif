const sohbetRouter = require("express").Router();
const sohbetController = require("../controllers/sohbetController");
const authMiddleware = require("../middlewares/authMiddleware");
const app = require("../../app");
console.log(app);
sohbetRouter.get("/",authMiddleware,sohbetController.sohbet);
// app.io.on("connection",connectedSocket=>{
//     console.log("bağladnı");
// })
module.exports = sohbetRouter;