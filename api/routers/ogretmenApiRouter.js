const ogretmenApiRouter = require("express").Router();
const ogretmenApiController = require("../controller/ogretmenApiController");

// ogretmen ekle
ogretmenApiRouter.post("/",ogretmenApiController.ogretmenEkle);

// tüm ogretmenleri getir
ogretmenApiRouter.get("/",ogretmenApiController.ogretmenleriGetir);

// tek ogretmen getir
ogretmenApiRouter.get("/:id",ogretmenApiController.ogretmenGetir);

module.exports = ogretmenApiRouter;