const { Schema, model } = require('mongoose');

const AnonCommands = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    channelId: {
        type: String,
        required: true,
    }
})

module.exports = model('AnonCommands', AnonCommands);