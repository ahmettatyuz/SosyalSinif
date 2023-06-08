const Odev = require("../models/odevModel");

const odevEkle = async (req,res,next)=>{
    try{
        const eklenecekOdev = new Odev(req.body);
        const result = await eklenecekOdev.save();
        if(result._id){
            res.json({
                mesaj:"Ödev ekleniyor...",
                status:200
            });
        }else{
            res.json({
                mesaj:"Ödev eklenemedi",
                status:404
            })
        }
    }catch(err){
        next(err);
    }
}

const odevleriGetir = async (req,res,next)=>{
    try{
        const sinifId = req.params.sinifid;
        const odevler = await Odev.find({sinifId:sinifId}).populate("tamamlayanOgrenciler.ogrenci");
        res.json(odevler);
    }catch(err){
        next(err);
    }
}

const odevGetir = async (req,res,next)=>{
    try{
        const odevId = req.params.odevid;
        console.log(odevId);
        const odev = await Odev.findById(odevId).populate("tamamlayanOgrenciler.ogrenci");
        res.json(odev);
    }catch(err){
        next(err);
    }
}

const odeviCoz = async(req,res,next)=>{
    try{
        const cozulenOdev = await Odev.findById(req.body.odevId);
        delete req.body.odevId;
        let ogrenci={
            ogrenci:req.userSession._id,
            dogruSayisi:0,
            yanlisSayisi:0
        };
        cozulenOdev.sorular.forEach((item,index)=>{
            console.log(item.answer);
            console.log(req.body[index]);
            if(item.answer == req.body[index] && item.answer!=undefined){
                ogrenci.dogruSayisi+=1;
            }else{
                ogrenci.yanlisSayisi+=1;
            }
        });
        console.log(ogrenci);
        cozulenOdev.tamamlayanOgrenciler.push(ogrenci);
        await cozulenOdev.save();
        
        res.json({
            mesaj:"odev çözüldü",
            status:200
        });


    }catch(err){
        next(err);
    }
}

module.exports = {
    odevEkle,
    odevleriGetir,
    odevGetir,
    odeviCoz
}