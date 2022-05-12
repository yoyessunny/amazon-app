const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminschema = new Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true       
    },
    name: {
        type: String
    }
});

const Admin = mongoose.model("admin", adminschema);

module.exports = Admin;