const ogrenciRouter = require("express").Router();
const ogrenciController = require("../controllers/ogrenciController");

ogrenciRouter.get("/dersler",ogrenciController.dersleriGetir);
ogrenciRouter.get("/dersler/:id",ogrenciController.dersiGetir);
ogrenciRouter.get("/profil",ogrenciController.profil);

module.exports = ogrenciRouter;