const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Token = mongoose.models.Token || mongoose.model('Token', tokenSchema);
export default Token;
