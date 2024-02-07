const { SlashCommandBuilder, Permissions } = require('discord.js');

const permissions = new Permissions();
permissions.add('ADMINISTRATOR');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('countchannel')
		.setDescription('Sets the channel and enables usage of count game.')
        .addChannelOption(option =>
          option.setName('channel')
            .setDescription('Select channel')
            .setRequired(true)),
	async execute(interaction) {
        var outputChannel = interaction.options.getChannel('channel');
        console.log(outputChannel);
		
		if (!interaction.member.permissions.has(permissions)) {
			await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
			return;
		}

		const channel = interaction.options.getChannel('channel');
			if (!channel.isText()) {
				await interaction.reply({ content: 'The specified channel is not a text channel.', ephemeral: true });
			return;
		}

		const countguildId = interaction.guildId;
		const countchannelId = channel.id;
		// Store the channel ID in a database or config file for later use

		await interaction.reply(`The counting channel has been set to ${channel}`);
		},
};
