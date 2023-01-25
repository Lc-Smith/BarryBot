const { SlashCommandBuilder } = require('discord.js');

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
    // Input Damage Output Level
    var intLevel = parseInt(inDamage / 2 - 5);
    await interaction.reply("People who deal `" + inDamage + "` damage are level `" + intLevel + "`.");
  },
};
