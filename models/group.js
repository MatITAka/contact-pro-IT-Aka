const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
    contacts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contact',
        },
    ],
}
);

module.exports = mongoose.model('Group', groupSchema);