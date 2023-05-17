const anasayfaRouter = require("express").Router();
const anasayfaController = require("../controllers/anasayfaController");
const authMiddleware = require("../middlewares/authMiddleware");
anasayfaRouter.get("/",authMiddleware,anasayfaController.anasayfa);

module.exports = anasayfaRouter;