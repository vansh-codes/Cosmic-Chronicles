const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsLetterSchema = new Schema({
    email: {
        type: String,
        unique: true, // Modify if allowing null emails
        required: true
    }
});

module.exports = mongoose.model('newsletter', newsLetterSchema);