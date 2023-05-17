const jwt = require("jsonwebtoken");
const authMiddleware = (req,res,next)=>{
    try {
        const token = req.cookies.token;
        // console.log(token);
        if (token!=undefined && token) {
            const sonuc = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if(sonuc.id){
                next();
            }
            
        }else{
            if(req.originalUrl!="/login"){
                res.redirect(process.env.BASE_URL+"/login");
            }else{
                res.render("login");
            }
        }
    } catch (err) {
        next(err);
    }
}

module.exports=authMiddleware;