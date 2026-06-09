const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('aslevel')
		.setDescription('Takes the inputted damage and outputs the level.')
    .addIntegerOption(option =>
      option.setName('damage')
        .setDescription('The damage dealt')
        .setRequired(true)),
	async execute(interaction) {
    const inDamage = interaction.options.getInteger('damage');

    if (inDamage < 0) {
      const errorEmbed = createEmbed({
        title: 'Invalid Damage',
        description: 'Damage must be zero or higher.',
        color: 0xff0000,
        interaction,
      });
      return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    const intLevel = inDamage / 2 - 5;
    const embed = createEmbed({
      title: 'Level from Damage',
      description: `**${inDamage}** damage corresponds to level **${intLevel}**.`,
      color: 0x6600cc,
      interaction,
    });
    await interaction.reply({ embeds: [embed] });
  },
};
