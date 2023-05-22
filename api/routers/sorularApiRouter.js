const sorularApiRouter = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const sorularApiController = require("../controller/sorularApiController");

// apideki rotada parametre olarak pageNumber alınıyor.
sorularApiRouter.get("/:pageNumber",authMiddleware,sorularApiController.sorulariGetir);

sorularApiRouter.post("/",authMiddleware,sorularApiController.soruEkle);
sorularApiRouter.post("/cevap/:soruId",authMiddleware,sorularApiController.cevapEkle);

sorularApiRouter.get("/soru/:soruId",authMiddleware,sorularApiController.soruGetir);

// sorularApiRouter.get("/like/:soruId",authMiddleware,sorularApiController.soruLike);
// sorularApiRouter.get("/dislike/:soruId",authMiddleware,sorularApiController.soruDislike);

module.exports=sorularApiRouter;
