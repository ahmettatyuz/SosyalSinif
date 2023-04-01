const registerApiRouter = require("express").Router();
const ogretmenApiController = require("../controller/ogretmenApiController");
const ogrenciApiController = require("../controller/ogrenciApiController");

registerApiRouter.post("/",(req,res,next)=>{
    console.log(req.body);
    if(req.body.role=="ogrenci"){
        ogrenciApiController.ogrenciEkle(req,res,next);
    }else if(req.body.role=="ogretmen"){
        ogretmenApiController.ogretmenEkle(req,res,next);
    }
    console.log("eklendi");
});

module.exports = registerApiRouter;