const loginRouter = require("express").Router();

loginRouter.get("/",(req,res,next)=>{
    res.render("login");
});

module.exports = loginRouter;