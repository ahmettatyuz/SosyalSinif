const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const sinifSchema = new Schema({
    ad:{
        type:String,
        require:true,
        trim:true
    },
    bolum:{
        type:String,
        trim:true
    },
    ogretmen:{type: Schema.Types.ObjectId, ref: 'User'},
    ogrenciler:[{ type: Schema.Types.ObjectId, ref: 'User' }],
    duyurular:[{type:Schema.Types.ObjectId,ref:"Duyuru"}],
    deleted:{
        type:String
    }
},{collection:"siniflar",timestamps:true});

sinifSchema.methods.joiValidation = function(sinifObject){
    // console.log(sinifObject);
    const schema = Joi.object({
        ad:Joi.string().trim().required(),
        bolum:Joi.string().optional().allow(""),
        ogretmen:Joi.string().trim().required()
    }).messages({'string.empty':"Sınıf adı zorunludur !"}); 
    return schema.validate(sinifObject);
}

const Sinif = mongoose.model("Sinif",sinifSchema);
module.exports = Sinif;