const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message:{
        type:String,
        require:true
    },
    sender:{
        type: Schema.Types.ObjectId, 
        ref: 'User',
        require:true
    },
    receiver:{
        type: Schema.Types.ObjectId, 
        ref: 'User',
        require:true
    },
    status:{
        type:String,
        require:true
    },
    file:{
        type:String
    },
    createdAt:{
        type:Date,
        default:() => Date.now() + 3*60*60*1000
    },
    updatedAt:{
        type:Date,
        default:() => Date.now() + 3*60*60*1000
    }

},{collection:"mesajlar",timestamps:true});

const Message = mongoose.model("Mesaj",messageSchema);
module.exports = Message;
