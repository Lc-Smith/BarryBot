const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('anonoutputchannel')
		.setDescription('Set the output channel for confessions')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('Select output channel')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
        var outputChannel = interaction.options.getChannel('channel');
        console.log(outputChannel.id);
        await interaction.reply({ content: "Setting channel...", ephemeral: true});
  },
};
