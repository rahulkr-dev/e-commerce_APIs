const { Schema, model } = require('mongoose')

const RefreshTokenSchema = new Schema({
    token: { type: String, required: true }
}, { timestamps: false });

module.exports = model("RefreshToken",RefreshTokenSchema,"refreshTokens");