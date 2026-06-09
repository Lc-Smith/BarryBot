const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { createEmbed } = require('../../utils/embed');
const AnonCommands = require('../../schemas/anoncommands');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setconfessions')
		.setDescription('Set the output channel for confessions')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('Select output channel')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
        const outputChannel = interaction.options.getChannel('channel');
        await interaction.deferReply({ ephemeral: true });

        try {
          const guildId = interaction.guild.id;
          const existingConfig = await AnonCommands.findOne({ guildId });

          if (existingConfig) {
            await AnonCommands.findOneAndDelete({ guildId });
          }

          const newAnonCommand = new AnonCommands({
            guildId,
            channelId: outputChannel.id,
          });

          await newAnonCommand.save();

          await interaction.editReply({
            embeds: [createEmbed({
              title: 'Set Confessions Channel',
              description: `${outputChannel} is now the anonymous confession channel.`,
              color: 0x00cc66,
              interaction,
            })],
          });
        } catch (error) {
          console.error('setconfessions failed:', error);
          await interaction.editReply({
            embeds: [createEmbed({
              title: 'Could Not Set Channel',
              description: 'There was a problem saving the confession channel configuration.',
              color: 0xff0000,
              fields: [{ name: 'Error', value: `${error.message ?? 'Unknown error'}`, inline: false }],
              interaction,
            })],
          });
        }

  },
};
