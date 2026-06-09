const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/embed');
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
    await interaction.deferReply({ ephemeral: true });

    try {
      const message = interaction.options.getString('message');
      const guildId = interaction.guild.id;

      const anonCommand = await AnonCommands.findOne({ guildId: guildId });

      if (!anonCommand) {
        return interaction.editReply({ content: 'This server does not have an anonymous channel set up!' });
      }

      const channel = interaction.guild.channels.cache.get(anonCommand.channelId);

      if (!channel) {
        return interaction.editReply({ content: 'The anonymous channel has been deleted!' });
      }

      const anonEmbed = createEmbed({
        title: 'Anonymous Confession',
        description: message,
        color: 0x000000,
      });

      await channel.send({ embeds: [anonEmbed] });

      const replyEmbed = createEmbed({
        title: 'Confession Sent',
        description: 'Your anonymous message has been delivered.',
        color: 0x00cc66,
        interaction,
      });
      await interaction.editReply({ embeds: [replyEmbed] });
    } catch (error) {
      console.error('Error executing confess command:', error);
      if (interaction.deferred || interaction.replied) {
        await interaction.editReply({ content: 'There was an error while executing this command!' });
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
  },
};
