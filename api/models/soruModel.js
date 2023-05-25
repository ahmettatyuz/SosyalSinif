const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const soruSchema = new Schema({
    kisi: { type: Schema.Types.ObjectId, ref: 'User' },
    title: {
        type: String,
        require: true,
        trim: true
    },
    htmlContent: {
        type: String,
        require: true
    },
    cevaplar: [{ type: Schema.Types.ObjectId, ref: 'Cevap' }],

}, { collection: "sorular", timestamps: true });

const Soru = mongoose.model("Soru", soruSchema);

module.exports = Soru;