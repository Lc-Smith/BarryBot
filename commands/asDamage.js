const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('asdamage')
		.setDescription('Takes the inputted level and outputs the damage.')
    .addIntegerOption(option =>
      option.setName('level')
        .setDescription("The player's level")
        .setRequired(true)),
	async execute(interaction) {
    const inLevel = parseInt(interaction.options.getInteger('level'));
    var intDamage = parseInt( ( inLevel * 2 ) + 10 );
    await interaction.reply("Level `" + inLevel + "` deals `" + intDamage + "` damage.");
  },
};
