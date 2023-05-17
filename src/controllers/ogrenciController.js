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
    const dersler = await axios.get(process.env.BASE_URL+"/api/dersler",config);
    // console.log(dersler.data);
    res.render("index", { page: "dersler",userSession:req.userSession,siniflar:dersler.data});
    
}

const dersiGetir = async (req, res, next) => {
    const token = req.cookies.token;
    // console.log(token);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    // console.log(req.params.id);
    let sinif = await axios.get(process.env.BASE_URL+"/api/dersler/"+req.params.sinifid,config);
    sinif=sinif.data;
    sinif.duyurular = toLocalTime(sinif.duyurular);
    res.render("index", { page: "dersDetay" ,userSession:req.userSession,sinif:sinif});
}

module.exports = {
    dersleriGetir,
    dersiGetir
}