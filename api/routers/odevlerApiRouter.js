const odevlerApiRouter = require("express").Router();
const odevlerApiController = require("../controller/odevlerApiController");
const authMiddleware = require("../middlewares/authMiddleware");

odevlerApiRouter.get("/:sinifid",authMiddleware,odevlerApiController.odevleriGetir);
odevlerApiRouter.post("/",authMiddleware,odevlerApiController.odevEkle);

module.exports = odevlerApiRouter;