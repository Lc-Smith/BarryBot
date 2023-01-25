const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ashealth')
		.setDescription('Takes the inputted damage and outputs the health.')
    .addIntegerOption(option =>
      option.setName('damage')
        .setDescription('The damage dealt')
        .setRequired(true)),
	async execute(interaction) {
    const inDamage = interaction.options.getInteger('damage');
    // Input Damage Output Health
    var intHealth = parseInt(inDamage * 10);
    await interaction.reply("People who deal `" + inDamage + "` damage have `" + intHealth + "` health.");
  },
};
