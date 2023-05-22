const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const cevapSchema = new Schema({
    kisi:{type: Schema.Types.ObjectId, ref: 'User'},
    htmlContent:{
        type:String,
        require:true
    },
    isSolution:{
        type:String,
    },

    
},{collection:"cevaplar",timestamps:true});

const Cevap = mongoose.model("Cevap",cevapSchema);

module.exports = Cevap;