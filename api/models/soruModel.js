const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const soruSchema = new Schema({
    title:{
        type:String,
        require:true,
        trim:true
    },
    htmlContent:{
        type:String,
        require:true
    },
    cevaplar:[{ type: Schema.Types.ObjectId, ref: 'Cevap' }],
    likeCount:{
        type:Number,
        default:0,
    },
    dislikeCount:{
        type:Number,
        default:0
    },
    
},{collection:"sorular",timestamps:true});

const Soru = mongoose.model("Soru",soruSchema);

module.exports = Soru;