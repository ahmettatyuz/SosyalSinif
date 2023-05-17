const sorularRouter = require("express").Router();
const sorularController = require("../controllers/sorularController");
const authMiddleware = require("../middlewares/authMiddleware");

sorularRouter.get("/:pageNumber",authMiddleware,sorularController.sorulariGetir);
sorularRouter.get("/soru/:soruId",authMiddleware,sorularController.soruGetir);


module.exports = sorularRouter;