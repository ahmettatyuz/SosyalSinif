const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
    try {
        // console.log(req);
        // console.log(req.header("Authorization"))
        const token = req.header("Authorization").replace("Bearer ","");
        if (token) {
            const sonuc = jwt.verify(token, process.env.JWT_SECRET_KEY);
            // console.log(sonuc);
            if(sonuc.id){
                req.userSession = sonuc;
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