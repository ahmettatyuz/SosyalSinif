const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sosyalsinif")
    .then(() => {
        console.log("Veritabanına bağlanıldı");
    })
    .catch((err) => {
        console.log(err + "-> Veritabanı hatası");
    });