const Sinif = require("../models/sinifModel");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const siniflariGetir = async (req, res, next) => {
    try {
        const tumSiniflar = await Sinif.find().populate("ogrenciler").populate("ogretmen");
        const ogrencininSiniflari = [];

        tumSiniflar.forEach(sinif=>{
            if(sinif.ogrenciler.map(ogrenci=>ogrenci._id.toString()).includes(req.userSession.id)){
                ogrencininSiniflari.push(sinif);
            }
        })
        res.json(ogrencininSiniflari);
    } catch (err) {
        next(err);
    }
}

const sinifGetir = async (req, res, next) => {
    try {
        const sinif = await Sinif.findOne({ _id: req.params.sinifid}).populate("ogrenciler").populate("ogretmen").populate("duyurular");
        
        res.json(sinif);
    } catch (err) {
        next(err);
        // res.json({
        //     mesaj: err + " Sinif getirilemedi.",
        // });
    }
}




module.exports = {
    sinifGetir,
    siniflariGetir,
}