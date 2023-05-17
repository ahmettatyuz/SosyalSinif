const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
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
    }
}, { collection: "todoList", timestamps: true });

const schema = Joi.object({
    title:Joi.string().trim().allow(null,""),
    content: Joi.string().trim().required()
}).messages({'any.required': "Lütfen tüm zorunlu alanları doldurun !", 'string.empty': "Lütfen tüm alanları doldurun !" })

todoSchema.methods.joiValidation = function (userObject) {
    return schema.validate(userObject);
}

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;