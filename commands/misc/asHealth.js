const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ashealth')
		.setDescription('Takes the inputted level and outputs the health.')
    .addIntegerOption(option =>
      option.setName('level')
        .setDescription("The player's level")
        .setRequired(true)),
	async execute(interaction) {
    const inLevel = interaction.options.getInteger('level');
    var intHealth = (( inLevel * 2 ) + 10) * 10;
    await interaction.reply("People who deal `" + inDamage + "` damage have `" + intHealth + "` health.");
  },
};
