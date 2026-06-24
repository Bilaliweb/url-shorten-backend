const mongoose = require("mongoose");

const urlShema = new mongoose.Schema({
    shortUrlId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    vistHistory: [
        {
            timestamp: {
                type: Number
            }
        }
    ],
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true
})


const URL = mongoose.model('url', urlShema)

module.exports = URL