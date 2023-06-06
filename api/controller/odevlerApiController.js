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

const odevleriGetir = (req,res,next)=>{

}

const odevGetir = (req,res,next)=>{

}

module.exports = {
    odevEkle
}