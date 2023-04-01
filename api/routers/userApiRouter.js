const userApiRouter = require("express").Router();
const userApiController = require("../controller/userApiController");

userApiRouter.get("/",userApiController.kullanicilariGetir);
userApiRouter.get("/:id",userApiController.kullaniciGetir);
userApiRouter.post("/",userApiController.kullaniciEkle);

module.exports = userApiRouter
