const Sinif = require("../models/sinifModel");
const siniflariGetir = async (req,res,next)=>{
    try{
        const tumSiniflar = await Sinif.find({}).populate("ogrenciler").populate("ogretmen");
        res.json(tumSiniflar);
    }catch(err){
        res.json({
            mesaj:err+" Siniflar getirilemedi.",
        });
    }
}

const sinifGetir = async (req,res,next)=>{
    try{
        const sinif = await Sinif.findById(req.params.id).populate("ogrenciler").populate("ogretmen");
        res.json(sinif);
    }catch(err){
        res.json({
            mesaj:err+" Sinif getirilemedi.",
        });
    }
}

const sinifEkle = async (req,res,next)=>{
    try{
        const eklenecekSinif = new Sinif(req.body);
        const sonuc  = await eklenecekSinif.save();
        res.json({
            mesaj:"Sinif Eklendi",
        });
    }catch(err){
        res.json({
            mesaj:"Sinif eklenemedi" + " "+ err,
        })
    }
}

module.exports = {
    sinifEkle,
    sinifGetir,
    siniflariGetir
}