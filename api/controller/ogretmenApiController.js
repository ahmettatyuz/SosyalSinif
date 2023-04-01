const Ogretmen = require("../models/ogretmenModel");
const ogretmenleriGetir = async (req,res,next)=>{
    try{
        const tumOgretmenler = await Ogretmen.find({});
        res.json(tumOgretmenler);
    }catch(err){
        res.json({
            mesaj:err+" Ogretmenler getirilemedi.",
        });
    }
}

const ogretmenGetir = async (req,res,next)=>{
    try{
        const ogretmen = await Ogretmen.findById(req.params.id);
        res.json(ogretmen);
    }catch(err){
        res.json({
            mesaj:err+" Ogretmen getirilemedi.",
        });
    } 
}

const ogretmenEkle = (req,res,next)=>{
    try{
        const tarih = new Date();
        const no = tarih.getFullYear().toString()+tarih.getMonth().toString()+tarih.getDay().toString()+tarih.getHours().toString()+tarih.getMinutes().toString()+tarih.getSeconds().toString();
        req.body.no=no;
        const eklenecekOgretmen = new Ogretmen(req.body);
        const sonuc = eklenecekOgretmen.save();
        res.json({
            mesaj:"Ogretmen eklendi"
        })
        
    }catch(err){
        res.json({
            mesaj:"Ogretmen eklenemedi" + " "+ err,
        })
    }
}

const ogretmenGuncelle = (req,res,next)=>{

}

const ogretmenSil = (req,res,next)=>{
    
}


module.exports = {
    ogretmenleriGetir,
    ogretmenEkle,
    ogretmenGetir
}
