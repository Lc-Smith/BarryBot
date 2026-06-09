const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ascoins')
		.setDescription('Calculates the levels gained from an amount of coins.')
		// Current Level
		.addIntegerOption(option =>
			option.setName('currentlevel')
				.setDescription('What is your current level?')
				.setRequired(true))
		// Coins
		.addIntegerOption(option =>
			option.setName('coincount')
				.setDescription('How many coins?')
				.setRequired(true)),

	async execute(interaction) {
    await interaction.deferReply();

    try {
      const cLevel = interaction.options.getInteger('currentlevel'); // Current level
      const cCoins = interaction.options.getInteger('coincount'); // Coin count

      if (cCoins <= 0) {
        const errorEmbed = createEmbed({
          title: 'Invalid Coin Amount',
          description: 'Please provide a positive number of coins.',
          color: 0xff0000,
          interaction,
        });
        return await interaction.editReply({ embeds: [errorEmbed] });
      }

      let level = cLevel;
      let coinsUsed = 0;
      let exp = 0;
      let currentExp = 0;

      const coinValue = (lvl) => (lvl >= 40000 ? 5000 : 200000);

      while (coinsUsed < cCoins) {
        const cap = level * 1000;
        currentExp += coinValue(level);
        coinsUsed += 1;

        while (currentExp >= cap) {
          currentExp -= cap;
          level += 1;
        }
      }

      const embed = createEmbed({
        title: 'Coin Conversion Results',
        description: 'Coin to level conversion estimate',
        color: 0x0099ff,
        fields: [
          { name: 'Starting Level', value: `${cLevel}`, inline: true },
          { name: 'Coins Used', value: `${cCoins}`, inline: true },
          { name: 'Result Level', value: `${level}`, inline: true },
          { name: 'Remaining EXP', value: `${currentExp}/${level * 1000}`, inline: false },
        ],
        interaction,
      });

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error('AS Coins failed:', error);
      const errorEmbed = createEmbed({
        title: 'Calculation Failed',
        description: 'There was a problem processing your coin conversion.',
        color: 0xff0000,
        fields: [{ name: 'Error', value: `${error.message ?? 'Unknown error'}`, inline: false }],
        interaction,
      });
      await interaction.editReply({ embeds: [errorEmbed] });
    }
  },
};