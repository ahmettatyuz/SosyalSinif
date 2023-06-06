const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const odevSchema = new Schema({
    sinifId:{ type: Schema.Types.ObjectId, ref: 'Sinif' },

    title: {
        type: String,
        require: true,
        trim: true
    },
    teslimTarihi:{
        type:Date,
        require:true,
        trim:true
    },
    puan:{
        type:String,
        require:true,
        trim:true
    },
    aciklama:{
        type:String,
        trim:true
    },
    sorular:[{
        soruType:{
            type:String,
            require:true,
            trim:true
        },
        content:{
            type:String,
            require:true,
            trim:true
        },
        answer:{
            type:String,
            trim:true
        },
        a:{
            type:String
        },
        b:{
            type:String
        },
        c:{
            type:String
        },
        d:{
            type:String
        }
    }],
    tamamlayanOgrenciler:[{ 
        ogrenci:{
            type: Schema.Types.ObjectId, ref: 'User' 
        },
        dogruSayisi:{
            type:Number
        },
        yanlisSayisi:{
            type:Number
        }
    }]

}, { collection: "odevler", timestamps: true });

const Odev = mongoose.model("Odev", odevSchema);

module.exports = Odev;