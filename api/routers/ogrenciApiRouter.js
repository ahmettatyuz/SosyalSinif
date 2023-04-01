const ogrenciApiRouter = require("express").Router();
const ogrenciApiController = require("../controller/ogrenciApiController");
// ogrenci ekle
ogrenciApiRouter.post("/",ogrenciApiController.ogrenciEkle);

// tüm kullanıcıları getir
ogrenciApiRouter.get("/",ogrenciApiController.ogrencileriGetir);

// tek ogrenci getir
ogrenciApiRouter.get("/:id",ogrenciApiController.ogrenciGetir);

module.exports = ogrenciApiRouter;