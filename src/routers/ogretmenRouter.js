const ogretmenRouter=require("express").Router();
const ogretmenController = require("../controllers/ogretmenController");
const authMiddleware = require("../middlewares/authMiddleware");
// routes
// ogretmenRouter.get("/",ogretmenController.anasayfa);
ogretmenRouter.get("/siniflar",authMiddleware,ogretmenController.siniflariGetir);
ogretmenRouter.get("/siniflar/:sinifid",authMiddleware,ogretmenController.sinifiGetir);

module.exports = ogretmenRouter;