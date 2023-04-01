const ogretmenRouter=require("express").Router();
const ogretmenController = require("../controllers/ogretmenController");

// routes
// ogretmenRouter.get("/",ogretmenController.anasayfa);
ogretmenRouter.get("/siniflar",ogretmenController.siniflariGetir);
ogretmenRouter.get("/siniflar/:id",ogretmenController.sinifiGetir);
ogretmenRouter.get("/profil",ogretmenController.profil)


module.exports = ogretmenRouter;