const userApiRouter = require("express").Router();
const userApiController = require("../controller/userApiController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const upload = multer({dest:"./public/profileImages"});

userApiRouter.get("/notifications",authMiddleware,userApiController.bildirimleriGetir);
userApiRouter.get("/faceId",userApiController.faceIdGet);
userApiRouter.get("/ogrenciler",authMiddleware,userApiController.ogrencileriGetir);
userApiRouter.get("/ogretmenler",authMiddleware,userApiController.ogretmenleriGetir);
userApiRouter.get("/:id",authMiddleware,userApiController.kullaniciGetir);


userApiRouter.post("/giris",userApiController.kullaniciGiris);
userApiRouter.post("/faceIdGiris",userApiController.faceIdileGiris);
userApiRouter.post("/faceId",authMiddleware,userApiController.faceIdPost);
userApiRouter.post("/parolamiUnuttum",userApiController.kodGonder);
// userApiRouter.post("/notifications",authMiddleware,userApiController.bildirimleriKaldir);

userApiRouter.post("/",userApiController.kullaniciEkle);

userApiRouter.patch("/parolaGuncelle",userApiController.parolaDegistir);
userApiRouter.patch("/:id",authMiddleware,upload.single("newProfile"),userApiController.kullaniciGuncelle);



module.exports = userApiRouter;