const sorularApiRouter = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const sorularApiController = require("../controller/sorularApiController");

// apideki rotada parametre olarak pageNumber alınıyor.
sorularApiRouter.get("/:pageNumber",authMiddleware,sorularApiController.sorulariGetir);

sorularApiRouter.post("/",authMiddleware,sorularApiController.soruEkle);

sorularApiRouter.get("/soru/:soruId",authMiddleware,sorularApiController.soruGetir);

module.exports=sorularApiRouter;
