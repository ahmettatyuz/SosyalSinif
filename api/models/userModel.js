const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    role:{
        type:String,
        require:true,
        trim:true
    },
    ad:{
        type:String,
        require:true,
        trim:true
    },
    soyad:{
        type:String,
        require:true,
        trim:true,
        
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true,
        lowercase:true,
        
    },
    adres:{
        type:String,
        require:true,
        trim:true
    },
    no:{
        type:Number,
        require:true,
        trim:true,
        unique:true,
        
    },
    cinsiyet:{
        type:String,
        require:true,
        trim:true,
    },
    parola:{
        type:String,
        require:true
    },
    profileImage:{
        type:String,
        default:"/image/user.png"
    },
    todo:[{ type: Schema.Types.ObjectId, ref: 'Todo' }],
    faceId:{
        type:String
    },
    isActive:{
        type:String,
        default:1
    },
    deleted:{
        type:String,
        default:0
    },
    notifications:[{type: Schema.Types.ObjectId, ref: 'Duyuru'}]

},{collection:"users",timestamps:true});

const schema = Joi.object({
    role:Joi.string().trim(),
    ad:Joi.string().trim(),
    soyad:Joi.string().trim(),
    email:Joi.string().trim().email(),
    adres:Joi.string().trim(),
    no:Joi.string().trim(),
    cinsiyet:Joi.string().trim(),
    parola:Joi.string(),
    parola2:Joi.any().valid(Joi.ref('parola'))
}).messages({'string.email':"Lütfen geçerli bir email girin !",'any.required':"Lütfen tüm zorunlu alanları doldurun !",'any.only':"Parolalar eşleşmiyor !",'string.empty':"Lütfen tüm alanları doldurun !"})

userSchema.methods.joiValidation = function(userObject){
    schema.required();
    return schema.validate(userObject);
}

userSchema.statics.joiValidationForUpdate = function(userObject){
    return schema.validate(userObject);
}

const User = mongoose.model("User",userSchema);

module.exports = User;

