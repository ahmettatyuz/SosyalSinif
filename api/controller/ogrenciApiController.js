const Ogrenci = require("../models/ogrenciModel");
const ogrencileriGetir = async (req,res,next)=>{
    try{
        const tumOgrenciler = await Ogrenci.find({});
        res.json(tumOgrenciler);
    }
    catch(err){
        res.json({
            mesaj:err+" Ogrenciler getirilemedi.",
        })
    }
    
}

const ogrenciGetir = async (req,res,next)=>{
    try{
        const ogrenci = await Ogrenci.findById(req.params.id);
        res.json(ogrenci);
    }catch(err){
        res.status(404).json({
            mesaj:err+" Ogrenci getirilemedi.",
        })
    } 
}

const ogrenciEkle = async (req,res,next)=>{
    try{
        const tarih = new Date();
        const no = tarih.getFullYear().toString()+tarih.getMonth().toString()+tarih.getDay().toString()+tarih.getHours().toString()+tarih.getMinutes().toString()+tarih.getSeconds().toString();
        req.body.no=no;
        
        const eklenecekOgrenci = new Ogrenci(req.body);
        const sonuc = await eklenecekOgrenci.save();
        res.json({
            mesaj:"Ogrenci Eklendi"
        });
    }
    catch(err){
        res.json({
            mesaj:"Ogrenci eklenemedi" + " "+ err,
        })
    }
}

const ogrenciGuncelle = (req,res,next)=>{

}

const ogrenciSil = (req,res,next)=>{
    
}


module.exports = {
    ogrencileriGetir,
    ogrenciEkle,
    ogrenciGetir
}