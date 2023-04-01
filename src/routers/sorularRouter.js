const sorularRouter = require("express").Router();
const sorularController = require("../controllers/sorularController");
sorularRouter.get("/",sorularController.sorulariGetir);

module.exports = sorularRouter;