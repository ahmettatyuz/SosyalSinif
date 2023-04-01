const axios = require("axios");

const dersleriGetir = (req, res, next) => {
    // axiosla istek atılıp veriler çekilecek
    res.render("index", { page: "dersler"});
}

const dersiGetir = (req, res, next) => {
    res.render("index", { page: "dersDetay" });
}

const profil = (req, res, next) => {
    res.render("index", { page: "profile" });
}

module.exports = {
    dersleriGetir,
    dersiGetir,
    profil
}