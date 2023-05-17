const sohbetApiRouter = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const sohbetApiController = require("../controller/sohbetApiController");

sohbetApiRouter.get("/",authMiddleware,sohbetApiController.goruldu,sohbetApiController.mesajlariGetir);
sohbetApiRouter.get("/unseen",authMiddleware,sohbetApiController.gorulmemisMesajlar);
sohbetApiRouter.get("/son",authMiddleware,sohbetApiController.sonMesajiGetir);
// sohbetApiRouter.post("/goruldu",authMiddleware,sohbetApiController.goruldu);
sohbetApiRouter.get("/seen",sohbetApiController.goruldu);
sohbetApiRouter.get("/unseenCount/:senderid",authMiddleware,sohbetApiController.gorulmemisMesajSayisi)
sohbetApiRouter.post("/",authMiddleware,sohbetApiController.mesajEkle);

module.exports = sohbetApiRouter;