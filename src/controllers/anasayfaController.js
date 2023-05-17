const jwt = require("jsonwebtoken");
const anasayfa = async (req,res,next)=>{
    res.render("index",{page:"anasayfa",userSession:req.userSession});
}

module.exports = {anasayfa};