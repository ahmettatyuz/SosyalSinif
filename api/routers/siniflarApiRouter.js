const siniflarApiRouter = require("express").Router();
const siniflarApiController = require("../controller/siniflarApiController");

siniflarApiRouter.post("/",siniflarApiController.sinifEkle);
siniflarApiRouter.get("/",siniflarApiController.siniflariGetir);
siniflarApiRouter.get("/:id",siniflarApiController.sinifGetir);

module.exports = siniflarApiRouter;