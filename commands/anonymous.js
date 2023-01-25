const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('anonymous')
		.setDescription('Send a message anonymously')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Input message')
        .setRequired(true)),
	async execute(interaction) {

  },
};
