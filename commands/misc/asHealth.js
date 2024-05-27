const { SlashCommandBuilder } = require('discord.js');

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
    const intHealth = (( inLevel * 2 ) + 10) * 10;
    var titleName = "";
    // Title name set
    if (intTitle == 25000) titleName = "Executioner";
    if (intTitle == 50000) titleName = "Destroyer";
    if (intTitle == 100000) titleName = "Supreme Reaper";
    if (intTitle == 250000) titleName = "Notorious Gladiator";
    if (intTitle == 500000) titleName = "Legend";
    if (intTitle == 1000000) titleName = "God";
    // Outputs
    if (!intTitle === null) {
      await interaction.reply("People who are level `" + inLevel + "` have `" + intHealth + "` health.");
    } else {
      const fullHealth = intHealth + intTitle;
      const outLevel = ((fullHealth / 10) - 10) / 2;
      await interaction.reply("Level `" + inLevel + "` with " + titleName + " title has `" + fullHealth + "` health. Equal to level `" + outLevel + "`!");
    }
  },
};
