const { Schema, model } = require('mongoose');

const AnonCommands = new Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
    },
    channelId: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = model('AnonCommands', AnonCommands);