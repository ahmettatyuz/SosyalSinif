const Mesaj = require("../models/mesajModel");
const createError = require("http-errors");
const mongoose = require('mongoose');


const mesajlariGetir = async (req, res, next) => {
    try {
        const receiver_id = new mongoose.Types.ObjectId(req.query.receiver);
        const sender_id = new mongoose.Types.ObjectId(req.query.sender);

        const mesajlar1 = await Mesaj.find({ receiver: receiver_id, sender: sender_id }).populate("sender").populate("receiver");
        const mesajlar2 = await Mesaj.find({ receiver: sender_id, sender: receiver_id }).populate("sender").populate("receiver");
        const tumMesajlar = mesajlar1.concat(mesajlar2).sort((a, b) => a.createdAt - b.createdAt);
        res.json(tumMesajlar);
    } catch (err) {
        next(err);
    }
}

const sonMesajiGetir = async (req, res, next) => {
    try {
        const receiver_id = new mongoose.Types.ObjectId(req.query.receiver);
        const sender_id = new mongoose.Types.ObjectId(req.query.sender);
        const sonMesaj = await Mesaj.findOne({$or:[{ receiver: receiver_id, sender: sender_id },{ sender: receiver_id, receiver: sender_id }]}).sort({createdAt:'desc'});
        res.json(sonMesaj);
    } catch (e) {
        next(e);
    }
}

const mesajEkle = async (req, res, next) => {
    try {
        req.body.status = "1";
        const eklenecekMesaj = new Mesaj(req.body);
        const sonuc = await eklenecekMesaj.save()
            .then(result => res.json({
                mesaj: "Mesaj gönderildi",
                id:result._id
            }))
            .catch(err => next(err));
    } catch (err) {
        next(err);
    }
}

const goruldu= async (req,res,next)=>{
    try{
        const receiver_id = new mongoose.Types.ObjectId(req.query.receiver);
        const sender_id = new mongoose.Types.ObjectId(req.query.sender);
        const sonuc = await Mesaj.updateMany({receiver: sender_id, sender: receiver_id,status:"1"},{status:"2"});
        // if(sonuc.modifiedCount>0){
        //     console.log(sonuc);
        // }
        next();
    }catch(err){
        next(err);
    }
}

const gorulmemisMesajlar = async (req,res,next)=>{
    try{
        const me = req.userSession.id;

        const mesajlar = await Mesaj.find({ receiver: me,status:"1"}).populate("sender").populate("receiver").sort({createdAt:'desc'});
        res.json(mesajlar);

    }catch(err){
        next(err);
    }
}

const gorulmemisMesajSayisi = async (req,res,next)=>{
    try{
        const me = new mongoose.Types.ObjectId(req.userSession.id);
        const you = new mongoose.Types.ObjectId(req.params.senderid);
        // console.log(you);
        // console.log(me);
        const count = await Mesaj.find({ receiver: me,sender:you,status:"1"}).countDocuments();
        res.json(count);
    }catch(err){

    }
}

module.exports = {
    mesajEkle, 
    mesajlariGetir, 
    sonMesajiGetir,
    goruldu,
    gorulmemisMesajSayisi,
    gorulmemisMesajlar
}