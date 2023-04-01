const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ogretmenSchema = new Schema({
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
    brans:{
        type:String,
        trim:true
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
    toDo:{
        type:String
    },
    faceId:{
        type:String
    },
    isActive:{
        type:String
    },
    deleted:{
        type:String
    }

},{collection:"ogretmenler"});

const Ogretmen = mongoose.model("Ogretmen",ogretmenSchema);

module.exports = Ogretmen;

