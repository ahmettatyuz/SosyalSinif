const axios = require("axios");
const { toLocalTime } = require("./helper");

const siniflariGetir = async (req, res, next) => {
    // // console.log(req.cookies);
    const token = req.cookies.token;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const siniflar = await axios.get(process.env.BASE_URL + "/api/siniflar", config);
    res.render("index", { page: "siniflar", siniflar: siniflar.data, userSession: req.userSession });
}

const sinifiGetir = async (req, res, next) => {
    const token = req.cookies.token;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let sinif = await axios.get(process.env.BASE_URL + "/api/siniflar/" + req.params.sinifid, config);
    sinif = sinif.data;
    const tumOgrenciler = await axios.get(process.env.BASE_URL + "/api/user/ogrenciler", config);
    sinif.duyurular = toLocalTime(sinif.duyurular);
    
    res.render("index", { page: "sinifDetay", userSession: req.userSession, sinif: sinif, tumOgrenciler: tumOgrenciler.data });
}


module.exports = {
    siniflariGetir,
    sinifiGetir
}