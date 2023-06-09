const Odev = require("../models/odevModel");

const odevEkle = async (req, res, next) => {
    try {
        const eklenecekOdev = new Odev(req.body);
        const result = await eklenecekOdev.save();
        if (result._id) {
            res.json({
                mesaj: "Ödev ekleniyor...",
                status: 200
            });
        } else {
            res.json({
                mesaj: "Ödev eklenemedi",
                status: 404
            })
        }
    } catch (err) {
        next(err);
    }
}

const odevleriGetir = async (req, res, next) => {
    try {
        const sinifId = req.params.sinifid;
        const userId = req.userSession._id;
        const odevler = await Odev.find(
            {
                sinifId: sinifId
            }).populate({
                path: "tamamlayanOgrenciler",
                select: 'ad soyad no profileImage'
            });
        res.json(odevler);
    } catch (err) {
        next(err);
    }
}

const odevGetir = async (req, res, next) => {
    try {
        const odevId = req.params.odevid;
        console.log(odevId);
        const odev = await Odev.findById(odevId).populate("tamamlayanOgrenciler.ogrenci");
        res.json(odev);
    } catch (err) {
        next(err);
    }
}

const odeviCoz = async (req, res, next) => {
    try {
        const cozulenOdev = await Odev.findById(req.body.odevId);
        delete req.body.odevId;
        console.log("çözen öğrenci");
        console.log(req.userSession.id);
        let object = {
            ogrenci: req.userSession.id,
            dogruSayisi: 0,
            yanlisSayisi: 0
        };
        cozulenOdev.sorular.forEach((item, index) => {
            console.log(item.answer);
            console.log(req.body[index]);
            if (item.answer == req.body[index] && item.answer != undefined) {
                object.dogruSayisi += 1;
            } else {
                object.yanlisSayisi += 1;
            }
        });
        console.log(object);
        cozulenOdev.tamamlayanOgrenciler.push(object);
        await cozulenOdev.save();

        res.json({
            mesaj: "Ödev çözüldü",
            status: 200
        });


    } catch (err) {
        next(err);
    }
}

module.exports = {
    odevEkle,
    odevleriGetir,
    odevGetir,
    odeviCoz
}