const derslerApiRouter = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const derslerApiController = require("../controller/derslerApiController");
const { bildirimleriKaldir } = require("../controller/userApiController");

derslerApiRouter.get("/",authMiddleware,derslerApiController.siniflariGetir);
derslerApiRouter.get("/:sinifid",authMiddleware,bildirimleriKaldir,derslerApiController.sinifGetir);

module.exports=derslerApiRouter;