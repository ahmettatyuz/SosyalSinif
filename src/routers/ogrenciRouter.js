const ogrenciRouter = require("express").Router();
const ogrenciController = require("../controllers/ogrenciController");
const authMiddleware = require("../middlewares/authMiddleware");

ogrenciRouter.get("/dersler",authMiddleware,ogrenciController.dersleriGetir);
ogrenciRouter.get("/dersler/:sinifid",authMiddleware,ogrenciController.dersiGetir);

module.exports = ogrenciRouter;