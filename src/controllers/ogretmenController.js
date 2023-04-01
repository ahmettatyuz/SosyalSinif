const axios = require("axios");

const siniflariGetir = async (req, res, next) => {
    const siniflar = await axios.get(process.env.BASE_URL+"/api/siniflar");
    res.render("index", { page: "siniflar" ,siniflar:siniflar.data});
}

const sinifiGetir = async (req, res, next) => {
    res.render("index", { page: "sinifDetay"});
}

const profil = (req, res, next) => {
    res.render("index", { page: "profile" })
}


module.exports = {
    siniflariGetir,
    sinifiGetir,
    profil
}