const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const AnonCommands = require('../../schemas/anoncommands');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('confess')
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
      return interaction.reply({ content: 'This server does not have an anonymous channel set up!', ephemeral: true });
    }

    const channel = interaction.guild.channels.cache.get(anonCommand.channelId);

    if (!channel) {
      return interaction.reply('The anonymous channel has been deleted!');
    }

    const embed = new EmbedBuilder()
			.setColor('#000000')
			.setTitle('Anonymous Confession')
			.addFields(
				{ value: message },
			)
			.setTimestamp();

    await channel.send({
      embeds: [embed],
    });

    await interaction.reply('Message sent!');
    


  },
};
