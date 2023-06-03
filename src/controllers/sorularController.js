const axios = require("axios");
const helper = require("../controllers/helper");

const sorulariGetir = async (req, res, next) => {
    const token = req.cookies.token;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const searchText = req.params.search;
    let sorular = [];
    if(searchText){
        sorular = await axios.get(process.env.BASE_URL + "/api/sorular/"+searchText, config);
    }else{
        sorular = await axios.get(process.env.BASE_URL + "/api/sorular/", config);

    }
    sorular = helper.toLocalTime(sorular.data);
    const popular = [...sorular].sort((a,b)=>b.cevaplar.length-a.cevaplar.length).slice(0, 5);;
    res.render("index", { page: "sorular", userSession: req.userSession, sorular: sorular,popular:popular });
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

    soru.cevaplar.sort((a,b)=>b.isSolution - a.isSolution);

    res.render("index", { page: "soruDetay", userSession: req.userSession, soru: soru });
}

module.exports = {
    sorulariGetir,
    soruGetir
}