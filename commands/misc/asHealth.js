const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ashealth')
		.setDescription('Takes the inputted level and outputs the health.')
    .addIntegerOption(option =>
      option.setName('level')
        .setDescription("The player's level")
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('title')
        .setDescription('What title do they have?')
        .setRequired(false)
        .addChoices(
          { name: 'Executioner', value: 25000 },
          { name: 'Destroyer', value: 50000 },
          { name: 'Supreme Reaper', value: 100000 },
          { name: 'Notorious Gladiator', value: 250000 },
          { name: 'Legend', value: 500000 },
          { name: 'God', value: 1000000 },
        )),
	async execute(interaction) {
    const inLevel = interaction.options.getInteger('level');
    const intTitle = interaction.options.getInteger('title');
    const baseHealth = ((inLevel * 2) + 10) * 10;
    const titleNames = {
      25000: 'Executioner',
      50000: 'Destroyer',
      100000: 'Supreme Reaper',
      250000: 'Notorious Gladiator',
      500000: 'Legend',
      1000000: 'God',
    };
    const titleName = titleNames[intTitle] || null;

    let description;
    if (intTitle === null) {
      description = `People who are level **${inLevel}** have **${baseHealth}** health.`;
    } else {
      const fullHealth = baseHealth + intTitle;
      const outLevel = ((fullHealth / 10) - 10) / 2;
      description = `Level **${inLevel}** with **${titleName}** title has **${fullHealth}** health. Equal to level **${outLevel}**!`;
    }

    const embed = createEmbed({
      title: 'Health Estimate',
      description,
      color: 0x00cc99,
      interaction,
    });

    await interaction.reply({ embeds: [embed] });
  },
};
