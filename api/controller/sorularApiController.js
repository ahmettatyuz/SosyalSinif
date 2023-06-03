const Soru = require("../models/soruModel");
const Cevap = require("../models/cevapModel");

const sorulariGetir = async (req, res, next) => {
    try {
        const sorular = await Soru.find({});
        res.json(sorular);
    }
    catch (err) {
        next(err);
    }
}

const soruEkle = async (req, res, next) => {
    try {
        const userId = req.userSession.id;
        const eklenecekSoru = new Soru(req.body);
        eklenecekSoru.kisi = userId;
        eklenecekSoru.save().then(result => {
            res.json({
                mesaj: "Sorunuz başarıyla eklendi !",
                status: 202
            });
        }).catch(err => {
            next(err);
        });
    } catch (err) {
        next(err);
    }
}

const soruGetir = async (req, res, next) => {
    try {
        const soruId = req.params.soruId;
        const soru = await Soru.findById(soruId).populate({
            path: 'cevaplar',
            populate: {
                path: 'kisi',
                select: 'ad soyad profileImage'
            }
        });

        console.log(soru);
        res.json(soru);
    } catch (err) {
        next(err);
    }
}

// const soruLike = async (req,res,next)=>{
//     try{
//         const soruId= req.params.soruId;
//         const soru = await Soru.findById(soruId);
//         soru.likeCount= parseInt(soru.likeCount)+1;
//         await soru.save();
//         res.json({
//             status:200,
//             mesaj:"Soru beğenildi."
//         })
//     }catch(err){
//         next(err);
//     }
// }

// const soruDislike = async (req,res,next)=>{
//     try{
//         // const soruId= 
//     }catch(err){
//         next(err);
//     }
// }

const cevapEkle = async (req, res, next) => {
    try {
        const soruId = req.params.soruId;
        const soru = await Soru.findById(soruId);
        const eklenecekCevap = new Cevap(req.body);
        eklenecekCevap.kisi = req.userSession.id;
        const cevap = await eklenecekCevap.save();
        soru.cevaplar.push(cevap._id);
        const result = await soru.save();
        res.json({
            status: 200,
            mesaj: "Cevap eklendi!",
        })
    } catch (err) {
        next(err);
    }
}

const markAsSolution = async (req, res, next) => {
    try {
        const cevap = await Cevap.findById(req.params.cevapId);
        cevap.isSolution = 1;
        await cevap.save();
        res.json({
            status: 200,
            mesaj: "Cevap çözüm olarak işaretlendi",
        })
    } catch (err) {
        next(err);
    }
}

const soruAra = async (req, res, next) => {
    try {
        const searchKeyword = req.params.search;
        const regex = new RegExp(searchKeyword, "i");

        const sorular = await Soru.find({
            $or: [
                { title: { $regex: regex } },
                { htmlContent: { $regex: regex } }
            ]
        }).populate('kisi').populate('cevaplar');
        res.json(sorular);
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    sorulariGetir,
    soruEkle,
    soruGetir,
    cevapEkle,
    markAsSolution,
    soruAra
}