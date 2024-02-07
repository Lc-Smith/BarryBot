const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('anonoutputchannel')
		.setDescription('Set the output channel for confessions')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('Select output channel')
        .setRequired(true)),
	async execute(interaction) {
        var outputChannel = interaction.options.getChannel('channel');
        console.log(outputChannel);
  },
};
