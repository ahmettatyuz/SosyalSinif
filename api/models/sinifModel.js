const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sinifSchema = new Schema({
    ad:{
        type:String,
        require:true,
        trim:true
    },
    aciklama:{
        type:String,
        trim:true
    },
    ogretmen:{type: Schema.Types.ObjectId, ref: 'Ogretmen'},
    ogrenciler:[{ type: Schema.Types.ObjectId, ref: 'Ogrenci' }],
    deleted:{
        type:String
    }
},{collection:"siniflar"});

const Sinif = mongoose.model("Sinif",sinifSchema);
module.exports = Sinif;