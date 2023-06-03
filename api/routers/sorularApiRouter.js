const sorularApiRouter = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const sorularApiController = require("../controller/sorularApiController");

// apideki rotada parametre olarak pageNumber alınıyor.
sorularApiRouter.get("/",authMiddleware,sorularApiController.sorulariGetir);
sorularApiRouter.get("/:search",authMiddleware,sorularApiController.soruAra);

sorularApiRouter.post("/",authMiddleware,sorularApiController.soruEkle);
sorularApiRouter.post("/cevap/:soruId",authMiddleware,sorularApiController.cevapEkle);
sorularApiRouter.post("/cozum/:cevapId",authMiddleware,sorularApiController.markAsSolution);

sorularApiRouter.get("/soru/:soruId",authMiddleware,sorularApiController.soruGetir);

// sorularApiRouter.get("/like/:soruId",authMiddleware,sorularApiController.soruLike);
// sorularApiRouter.get("/dislike/:soruId",authMiddleware,sorularApiController.soruDislike);

module.exports=sorularApiRouter;
