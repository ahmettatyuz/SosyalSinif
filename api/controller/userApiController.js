const User = require("../models/userModel");

const kullanicilariGetir = async (req, res, next) => {
    try {
        const kullanicilar = await User.find({});
        res.json(kullanicilar);
    } catch (err) {
        res.status(404).json({
            mesaj: err + " Kullanıcılar getirilemedi.",
        });
    }
}

const kullaniciGetir = async (req, res, next) => {
    try {
        const kullanici = await User.findById(req.params.id);
        res.json(kullanici);
    } catch (err) {
        res.status(404).json({
            mesaj: err + " Kullanıcı bulunamadı.",
        });
    }
}

const noOlustur = function () {
    const tarih = new Date();
    return tarih.getFullYear().toString() + tarih.getMonth().toString() + tarih.getDay().toString() + tarih.getHours().toString() + tarih.getMinutes().toString() + tarih.getSeconds().toString();
}

const kullaniciEkle = (req, res, next) => {
    try {
        req.body.no = noOlustur();
        const eklenecekUser = new User(req.body);
        const sonuc = eklenecekUser.save()
        .then(result=>res.send(result))
        .catch(err=>{
            res.status(404).json(err);
        });
        
    }
    catch(err){
        res.status(404).json({
            mesaj:"Kullanıcı eklenemedi "+err
        })
    }
    
}

const kullaniciSil = (req,res,next)=>{

}

const kullaniciGuncelle = (req,res,next)=>{
    
}

module.exports = {
    kullanicilariGetir,kullaniciGetir,kullaniciEkle
}