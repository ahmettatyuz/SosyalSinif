const jwt = require("jsonwebtoken");
const axios = require("axios");

const sohbet = async (req, res, next) => {
    const token = req.cookies.token;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let ogretmenler = await axios.get(process.env.BASE_URL + "/api/user/ogretmenler", config);
    let ogrenciler = await axios.get(process.env.BASE_URL + "/api/user/ogrenciler", config);
    ogrenciler = ogrenciler.data.filter(ogrenci => ogrenci._id != req.userSession.id);
    ogretmenler = ogretmenler.data.filter(ogretmen => ogretmen._id != req.userSession.id);

    ogretmenler = ogretmenler.map(async user => {
        const params = {
            sender: req.userSession.id,
            receiver: user._id
        }
        config.params = params;
        const sonuc = await axios.get(process.env.BASE_URL + "/api/sohbet/son", config);
        const count = await axios.get(process.env.BASE_URL + "/api/sohbet/unseenCount/"+user._id, config);
        // console.log(count.data);
        if (sonuc.data != null)
            sonMesaj = {
                mesaj: sonuc.data.message,
                time: sonuc.data.createdAt.split("T")[1].slice(0, 5)
            };
        else
            sonMesaj = {
                mesaj: "",
                time: ""
            };
        user.sonMesaj = sonMesaj;
        user.unseenCount = count.data;
        // console.log(user);
        return user;
    })

    ogrenciler = ogrenciler.map(async user => {
        const params = {
            sender: req.userSession.id,
            receiver: user._id
        }
        config.params = params;
        const sonuc = await axios.get(process.env.BASE_URL + "/api/sohbet/son", config);
        const count = await axios.get(process.env.BASE_URL + "/api/sohbet/unseenCount/"+user._id, config);
        // console.log(count.data);
        if (sonuc.data != null) {
            sonMesaj = {
                mesaj: sonuc.data.message,
                time: sonuc.data.createdAt.split("T")[1].slice(0, 5)
            };
        }

        else {
            sonMesaj = {
                mesaj: "",
                time: ""
            };
        }
        user.sonMesaj = sonMesaj;
        user.unseenCount = count.data;

        // console.log(user);
        return user;
    })

    await Promise.all(ogretmenler).then(result => {
        ogretmenler = result;
    });
    await Promise.all(ogrenciler).then(result => {
        // console.log(result);
        ogrenciler = result;
    });

    res.render("index", {
        page: "sohbet",
        userSession: req.userSession,
        ogretmenler: ogretmenler,
        ogrenciler: ogrenciler
    });
}


module.exports = {
    sohbet
}