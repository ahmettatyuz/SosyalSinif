const jwt = require("jsonwebtoken");
const login = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (token!=undefined && token) {
            const sonuc = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if(sonuc.id){
                res.redirect("/");
            }
            
        }else{
            res.render("login");
        }
    } catch (err) {
        next(err);
    }
}

const logout = (req,res,next)=>{
    try{
        // console.log("cikis yapıldı");
        res.clearCookie("token");
        res.end();
    }catch(err){
        next(err);
    }
}

module.exports = {
    login,
    logout
};