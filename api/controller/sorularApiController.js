const Soru = require("../models/soruModel");



const sorulariGetir = async (req,res,next)=>{
    try{
        const pageNumber = req.params.pageNumber;
        const pageSize = 10;
        const sorular = await Soru.find({}).skip((pageNumber-1)*pageSize).limit(pageSize);
        res.json(sorular);
    }
    catch(err){
        next(err);
    }   
}

const soruEkle = async (req,res,next)=>{
    try{
        const eklenecekSoru = new Soru(req.body);
        eklenecekSoru.save().then(result=>{
            res.json({
                mesaj:"Sorunuz başarıyla eklendi !",
                status:202
            });
        }).catch(err=>{
            next(err);
        });

    }catch(err){
        next(err);
    }
}

const soruGetir= async (req,res,next)=>{
    try{
        const soruId = req.params.soruId;
        const soru = await Soru.findById(soruId);
        res.json(soru);
    }catch(err){
        next(err);
    }
}

module.exports = {
    sorulariGetir,
    soruEkle,
    soruGetir
}