const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const duyuruSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
        default: "1"
    },
    sinifid:{
        type:String,
        require:true
    }
    ,sinifAd:{
        type:String,
        require:true,
    }
}, { collection: "duyurular", timestamps: true });

const schema = Joi.object({
    title:Joi.string().trim().required(),
    content:Joi.string().trim().required(),
    status:Joi.string().optional().allow(""),
    sinifid:Joi.string().trim(),
}).messages({'any.required':"Lütfen tüm zorunlu alanları doldurun !",'string.empty':"Lütfen tüm alanları doldurun !"});

duyuruSchema.methods.joiValidation = function(duyuruObject){
    return schema.validate(duyuruObject);
}


const Duyuru = mongoose.model("Duyuru",duyuruSchema);
module.exports = Duyuru;
