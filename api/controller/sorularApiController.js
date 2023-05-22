const Soru = require("../models/soruModel");
const Cevap = require("../models/cevapModel");


const sorulariGetir = async (req, res, next) => {
    try {
        const pageNumber = req.params.pageNumber;
        const pageSize = 10;
        const sorular = await Soru.find({}).skip((pageNumber - 1) * pageSize).limit(pageSize);
        res.json(sorular);
    }
    catch (err) {
        next(err);
    }
}

const soruEkle = async (req, res, next) => {
    try {
        const eklenecekSoru = new Soru(req.body);
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
              select: 'ad soyad profileImage -_id'
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

module.exports = {
    sorulariGetir,
    soruEkle,
    soruGetir,
    cevapEkle
}