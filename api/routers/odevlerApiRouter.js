const odevlerApiRouter = require("express").Router();
const odevlerApiController = require("../controller/odevlerApiController");
const authMiddleware = require("../middlewares/authMiddleware");

odevlerApiRouter.get("/odev/:odevid",authMiddleware,odevlerApiController.odevGetir);
odevlerApiRouter.get("/:sinifid",authMiddleware,odevlerApiController.odevleriGetir);
odevlerApiRouter.post("/cozum",authMiddleware,odevlerApiController.odeviCoz);
odevlerApiRouter.post("/",authMiddleware,odevlerApiController.odevEkle);


module.exports = odevlerApiRouter;