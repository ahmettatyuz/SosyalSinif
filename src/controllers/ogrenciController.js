const axios = require("axios");
const jwt = require("jsonwebtoken");
const { toLocalTime } = require("./helper");
const dersleriGetir = async (req, res, next) => {
    // axiosla istek atılıp veriler çekilecek
    const token = req.cookies.token;
    // console.log(token);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    // console.log("burdayiz 2");
    // console.log(process.env.BASE_URL+"/api/dersler");
    const dersler = await axios.get(process.env.BASE_URL + "/api/dersler", config);
    // console.log(dersler.data);
    res.render("index", { page: "dersler", userSession: req.userSession, siniflar: dersler.data });

}

const dersiGetir = async (req, res, next) => {
    const token = req.cookies.token;
    // console.log(token);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    // console.log(req.params.id);
    let sinif = await axios.get(process.env.BASE_URL + "/api/dersler/" + req.params.sinifid, config);
    sinif = sinif.data;
    sinif.duyurular = toLocalTime(sinif.duyurular);

    let odevler = await axios.get(process.env.BASE_URL + "/api/odevler/" + req.params.sinifid, config);



    odevler = toLocalTime(odevler.data);

    console.log(odevler);
    const ogrenciId = req.userSession.id;
    var cozulmusOdevler = odevler.filter(function (odev) {
        // Tamamlayan öğrenciler dizisinde kullanıcının ID'sini kontrol et
        var tamamlayanOgrenciler = odev.tamamlayanOgrenciler;
        var tamamlandiMi = tamamlayanOgrenciler.some(function (ogrenci) {
            return ogrenci.ogrenci === ogrenciId;
        });

        // Tamamlanmamış ödevleri döndür
        return !tamamlandiMi;
    });

    var cozulmemisOdevler = odevler.filter(function (odev) {
        // Tamamlayan öğrenciler dizisinde kullanıcının ID'sini kontrol et
        var tamamlayanOgrenciler = odev.tamamlayanOgrenciler;
        var tamamlandiMi = tamamlayanOgrenciler.some(function (ogrenci) {
            return ogrenci.ogrenci === ogrenciId;
        });

        // Tamamlanmamış ödevleri döndür
        return tamamlandiMi;
    });



    res.render("index", { page: "dersDetay", userSession: req.userSession, sinif: sinif, odevler: cozulmusOdevler,cozulmemisOdevler : cozulmemisOdevler });
}

module.exports = {
    dersleriGetir,
    dersiGetir
}