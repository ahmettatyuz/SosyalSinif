const jwt = require("jsonwebtoken");
const axios = require("axios");
const helper = require("../controllers/helper");
const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        // console.log(token)
        if (token) {
            const sonuc = jwt.verify(token, process.env.JWT_SECRET_KEY);
            
            if(sonuc.id){
                
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                req.userSession = sonuc;

                const mesajlar = await axios.get(process.env.BASE_URL+"/api/sohbet/unseen",config);
                req.userSession.mesajlar=mesajlar.data;

                
                let bildirimler = await axios.get(process.env.BASE_URL+"/api/user/notifications",config);
                bildirimler=bildirimler.data;
                if(req.params.sinifid){
                    const sinifid = req.params.sinifid;
                    bildirimler=bildirimler.filter(bildirim=>bildirim.sinifid!=sinifid);
                }
                
                
                bildirimler=helper.toLocalTime(bildirimler);
                req.userSession.bildirimler = bildirimler;
                next();
            }
            
        }else{
            res.status(404).send("Oturum zaman aşımına uğradı");
        }
    } catch (err) {
        next(err);
    }

}

module.exports = auth;