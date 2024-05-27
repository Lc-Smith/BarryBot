const { SlashCommandBuilder } = require('discord.js');
const AnonCommands = require('../../schemas/anoncommands');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('anonymous')
		.setDescription('Send a message anonymously')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Input message')
        .setRequired(true)),
	async execute(interaction) {


    const message = interaction.options.getString('message');
    const guildId = interaction.guild.id;

    const anonCommand = await AnonCommands.findOne({ guildId: guildId });

    if (!anonCommand) {
      return interaction.reply('This server does not have an anonymous channel set up!');
    }

    const channel = interaction.guild.channels.cache.get(anonCommand.channelId);

    if (!channel) {
      return interaction.reply('The anonymous channel has been deleted!');
    }

    await channel.send(message);
    await interaction.reply('Message sent!');
    


  },
};
