const profilRouter = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const profilController = require("../controllers/profilController");

profilRouter.get("/",authMiddleware,profilController.profil);

module.exports=profilRouter;