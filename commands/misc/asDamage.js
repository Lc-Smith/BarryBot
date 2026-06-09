const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('asdamage')
		.setDescription('Takes the inputted level and outputs the damage.')
    .addIntegerOption(option =>
      option.setName('level')
        .setDescription("The player's level")
        .setRequired(true)),
	async execute(interaction) {
    const inLevel = interaction.options.getInteger('level');

    if (inLevel < 0) {
      const errorEmbed = createEmbed({
        title: 'Invalid Level',
        description: 'Level must be zero or higher.',
        color: 0xff0000,
        interaction,
      });
      return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    const intDamage = (inLevel * 2) + 10;
    const embed = createEmbed({
      title: 'Damage Estimate',
      description: `Level **${inLevel}** deals **${intDamage}** damage.`,
      color: 0xff9900,
      interaction,
    });
    await interaction.reply({ embeds: [embed] });
  },
};
