const Sinif = require("../models/sinifModel");
const Duyuru = require("../models/duyuruModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const siniflariGetir = async (req, res, next) => {
    try {
        const tumSiniflar = await Sinif.find({ ogretmen: req.userSession.id }).populate("ogrenciler").populate("ogretmen");
        res.json(tumSiniflar);
    } catch (err) {
        next(err);
        // res.json({
        //     mesaj: err + " Siniflar getirilemedi.",
        // });
    }
}

const sinifGetir = async (req, res, next) => {
    try {
        // const token = req.header("Authorization").replace("Bearer ","");
        // const userSession= await jwt.verify(token,process.env.JWT_SECRET_KEY);
        const sinif = await Sinif.findOne({ _id: req.params.sinifid, ogretmen: req.userSession.id }).populate("ogrenciler").populate("ogretmen").populate("duyurular");
        res.json(sinif);
    } catch (err) {
        next(err);
    }
}

const sinifEkle = async (req, res, next) => {
    try {
        req.body.ogretmen = req.userSession.id;
        console.log(req.body.ogretmen);
        const eklenecekSinif = new Sinif(req.body);
        const { error, value } = eklenecekSinif.joiValidation(req.body);
        if (error) {
            // console.log("burada");
            console.log(error);
            next(error);
        } else {
            const sonuc = await eklenecekSinif.save()
                .then(result => res.json({
                    mesaj: "Sınıf ekleniyor..."
                }))
                .catch(err => next(err));
        }

    } catch (err) {
        next(err);
    }
}

const sinifaOgrenciEkle = async (req, res, next) => {
    try {
        const sinif = await Sinif.findById(req.body.sinifid);
        if (typeof req.body.ogrenciler == "string") {
            sinif.ogrenciler.push(req.body.ogrenciler);
        }
        else if (typeof sinif.ogrenciler == "object") {
            sinif.ogrenciler = sinif.ogrenciler.concat(req.body.ogrenciler);
        }
        const uzunluk = sinif.ogrenciler.length;
        sinif.ogrenciler = Array.from(new Set(sinif.ogrenciler.map(item => item.toString())));
        let mesaj = "";
        if (uzunluk == sinif.ogrenciler.length) {
            mesaj = "Öğrenci Eklendi";
        } else {
            throw createError(404, "Öğrenci Eklenemedi !");
        }
        const sonuc = await sinif.save().then(result => {
            res.json({
                mesaj: mesaj,
            });
        }).catch(err => next(err));
        // console.log(sinif.ogrenciler.toString())
        // const sonuc = await sinif.updateOne({_id:req.body.sinifid},{ogrenciler: sinif.ogrenciler}).then(result=>{
        //     res.json({
        //         mesaj:"Öğrenci Eklendi"
        //     })
        // }).catch(err=>next(err));

    } catch (err) {
        next(err)
    }
}

const sinifiSil = async (req, res, next) => {
    try {
        const sinifId = req.params.sinifid;
        const sonuc = await Sinif.deleteOne({ _id: sinifId }).then(result => {
            res.json({
                mesaj: "Sınıf siliniyor !"
            });
        }).catch(err => next(err));
    } catch (err) {
        next(err);
    }
}

const siniftanOgrenciKaldir = async (req, res, next) => {
    try {
        const sinif = await Sinif.findById({_id:req.body.sinifID});
        const ogrenciID = req.body.ogrenciID;
        // console.log(ogrenciID);
        const index = sinif.ogrenciler.map(item=>item.toString()).indexOf(ogrenciID);
        // console.log(sinif.ogrenciler.map(item=>item.toString()));
        // console.log(index);
        sinif.ogrenciler.splice(index, 1);
        // console.log(sinif.ogrenciler);
        const sonuc = await sinif.save().then(result=>{
            res.json({
                mesaj:"Öğrenci kaldırılıyor..."
            });
        }).catch(err=>next(err));
    }
    catch (err) {
        next(err);
    }
}

const siniftanDuyuruKaldir = async (req,res,next)=>{

}

const sinifaDuyuruEkle = async (req,res,next)=>{
    try{
        const sinif = await Sinif.findById(req.body.sinifid);
        const eklenecekDuyuru = new Duyuru(req.body);
        const { error, value } = eklenecekDuyuru.joiValidation(req.body);
        if(error){
            next(error);
        }else{
            eklenecekDuyuru.sinifAd=sinif.ad;
            await eklenecekDuyuru.save();
            sinif.duyurular.push(eklenecekDuyuru._id);
            sinif.ogrenciler.forEach(async ogrenci=>{
                const user = await User.findById(ogrenci._id);
                user.notifications.push(eklenecekDuyuru._id);
                await user.save();
            });
            const sonuc = await sinif.save();
            if(sonuc){
                res.json({
                    mesaj:"Duyuru ekleniyor...",
                    status:202
                });
            }else{
                res.json({
                    status:404,
                    mesaj:"Duyuru eklenemedi"
                })
            }
        }

    }catch(err){
        next(err);
    }
}

module.exports = {
    sinifEkle,
    sinifGetir,
    siniflariGetir,
    sinifaOgrenciEkle,
    sinifiSil,
    siniftanOgrenciKaldir,
    sinifaDuyuruEkle
}