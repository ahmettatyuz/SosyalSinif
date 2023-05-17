const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const cevapSchema = new Schema({
    soruId:{type: Schema.Types.ObjectId, ref: 'Soru' },
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


const Cevap = mongoose.model("Cevap",cevapSchema);

module.exports = Cevap;