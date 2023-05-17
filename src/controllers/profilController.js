const axios = require("axios");

const profil = async (req, res, next) => {
    // console.log(req.userSession.id);
    const token = req.cookies.token;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const user = await axios.get(process.env.BASE_URL+"/api/user/"+req.userSession.id,config);
    // console.log(user.data);
    res.render("index", { page: "profile" ,userSession:req.userSession,user:user.data});
}


module.exports={
    profil
}