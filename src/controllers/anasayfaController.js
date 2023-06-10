const jwt = require("jsonwebtoken");
const axios = require("axios");
const anasayfa = async (req,res,next)=>{
    const token = req.cookies.token;
        // console.log(token);
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
    if(req.userSession.role=="ogrenci"){
        const dersler = await axios.get(process.env.BASE_URL + "/api/dersler", config);
        res.render("index", { page: "dersler", userSession: req.userSession, siniflar: dersler.data });
    }else if (req.userSession.role=="ogretmen"){
        const siniflar = await axios.get(process.env.BASE_URL + "/api/siniflar", config);
        res.render("index", { page: "siniflar", siniflar: siniflar.data, userSession: req.userSession });
    }
}

module.exports = {anasayfa};