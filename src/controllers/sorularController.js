const axios = require("axios");
const helper = require("../controllers/helper");

const sorulariGetir = async (req, res, next) => {
    const token = req.cookies.token;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const pageNumber = req.params.pageNumber;
    let sorular = await axios.get(process.env.BASE_URL + "/api/sorular/" + pageNumber, config);
    sorular = helper.toLocalTime(sorular.data);
    console.log(sorular.data);
    res.render("index", { page: "sorular", userSession: req.userSession, sorular: sorular });
}

const soruGetir = async (req, res, next) => {
    const token = req.cookies.token;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const soruId =  req.params.soruId;
    let soru = await axios.get(process.env.BASE_URL+"/api/sorular/soru/"+soruId,config);
    // console.log(soru.data);
    soru = helper.toLocalTimeSingle(soru.data);

    soru.cevaplar = helper.toLocalTime(soru.cevaplar);
    res.render("index", { page: "soruDetay", userSession: req.userSession, soru: soru });
}

module.exports = {
    sorulariGetir,
    soruGetir
}