const siniflarApiRouter = require("express").Router();
const siniflarApiController = require("../controller/siniflarApiController");
const { bildirimleriKaldir } = require("../controller/userApiController");
const authMiddleware = require("../middlewares/authMiddleware");


siniflarApiRouter.post("/",authMiddleware,siniflarApiController.sinifEkle);
siniflarApiRouter.get("/",authMiddleware,siniflarApiController.siniflariGetir);
siniflarApiRouter.get("/:sinifid",authMiddleware,bildirimleriKaldir,siniflarApiController.sinifGetir);
siniflarApiRouter.delete("/:sinifid",authMiddleware,siniflarApiController.sinifiSil);
siniflarApiRouter.post("/ogrenciEkle",authMiddleware,siniflarApiController.sinifaOgrenciEkle);
siniflarApiRouter.patch("/ogrenciSil",authMiddleware,siniflarApiController.siniftanOgrenciKaldir);
siniflarApiRouter.post("/duyuruEkle",authMiddleware,siniflarApiController.sinifaDuyuruEkle);
module.exports = siniflarApiRouter;