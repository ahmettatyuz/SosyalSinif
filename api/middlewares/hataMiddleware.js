const hataYakalayici = (err,req,res,next)=>{
    console.log("HATAAAAA");
    console.log(err);
    const errCode = err.code;
    if(errCode == "11000"){
        const hataKey = Object.keys(err.keyValue)[0];
        const hataValue = Object.values(err.keyValue)[0];
        res.json({
            status: 404,
            mesaj: `Bu ${hataKey} ile daha önceden bir kayıt eklenmiş !`,
        })
    }
    else if (err.kind=="ObjectId"){
        res.json({
            status: 404,
            mesaj: `Hatalı Kod !`,
        })
    }
    else{
        res.json({
            status:404,
            mesaj:"Hatalı İşlem !"
        });
    }
    
}

module.exports = hataYakalayici;