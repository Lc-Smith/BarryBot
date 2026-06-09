const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ascalc')
		.setDescription('Calculates the amount of time it would take for you to level up if grinding.')
		// Current Level
		.addIntegerOption(option =>
			option.setName('currentlevel')
				.setDescription('What is your current level?')
				.setRequired(true))
		// Goal Level
		.addIntegerOption(option =>
			option.setName('goallevel')
				.setDescription('What level do you want to be?')
				.setRequired(true))
		// Multiplier
		.addIntegerOption(option =>
			option.setName('multiplier')
				.setDescription('What gamepass multiplier do you have?')
				.setRequired(true)
				.addChoices(
					{ name: 'No multi', value: 1 },
					{ name: '8x multi', value: 8 },
					{ name: '13x multi', value: 13 },
		))
    // Fireball
    .addBooleanOption(option =>
      option.setName('fireball')
        .setDescription('Do you have fireball?')
        .setRequired(false)),
	async execute(interaction) {
    await interaction.deferReply();

    try {
      const cLevel = interaction.options.getInteger('currentlevel'); // Current level
      const gLevel = interaction.options.getInteger('goallevel'); // Level goal
      const fBall = interaction.options.getBoolean('fireball') ?? false; // Fireball bool
      const totalMulti = interaction.options.getInteger('multiplier'); // Full Multiplier total

      if (gLevel <= cLevel) {
        const errorEmbed = createEmbed({
          title: 'Invalid Levels',
          description: 'Goal level must be higher than your current level.',
          color: 0xff0000,
          interaction,
        });
        return await interaction.editReply({ embeds: [errorEmbed] });
      }

      let level = cLevel;
      let currentExp = 0;
      let hits = 0;
      let totalExp = 0;
      const passiveExp = 0;

      const expPerHit = (lvl) => (1000 * totalMulti) + lvl + (lvl >= 5000 ? 5000 : 0);
      const hitCalc = (lvl) => {
        const expNeeded = lvl * 1000;
        return (expNeeded / expPerHit(lvl)).toFixed(2);
      };
      const timeCalc = (hitCount) => {
        const divisor = fBall ? 1.75 : 1.4;
        let seconds = Math.floor(hitCount / divisor);

        const days = Math.floor(seconds / 86400);
        seconds -= days * 86400;
        const hours = Math.floor(seconds / 3600);
        seconds -= hours * 3600;
        const minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;

        const pad = (value) => String(value).padStart(2, '0');
        return [pad(days), pad(hours), pad(minutes), pad(seconds)];
      };

      while (level < gLevel) {
        const cap = level * 1000;
        totalExp += cap;
        const need = Math.max(0, cap - currentExp);
        const hitsForLevel = Math.ceil(need / expPerHit(level));

        hits += hitsForLevel;
        currentExp += hitsForLevel * expPerHit(level);
        currentExp -= cap;
        level += 1;
      }

      const arrayTime = timeCalc(hits);
      const fields = [
        {
          name: 'Inputs',
          value: `Current Level: **${cLevel}**\nGoal Level: **${gLevel}**\nMultiplier: **${totalMulti}x**\nFireball: **${fBall ? 'Yes' : 'No'}**`,
          inline: false,
        },
        {
          name: 'Estimated Result',
          value: `This should take **${hits}** hits over **${arrayTime[0]} Days ${arrayTime[1]}:${arrayTime[2]}:${arrayTime[3]}**.`,
          inline: false,
        },
      ];

      if (interaction.user.id === '301313670850543616') {
        const totalHit = passiveExp + hits;
        fields.push({
          name: 'Owner Details',
          value: `Passive income: **${passiveExp}**\nTotal EXP: **${totalExp}**\nTotal hits: **${totalHit}**\nExpected first level hits: **${hitCalc(level)}**`,
          inline: false,
        });
      }

      const embed = createEmbed({
        title: 'AS Calc Results',
        description: 'Please be aware that due to human based timings, this is an estimation and may not be accurate.',
        color: 0x9900ff,
        fields,
        interaction,
      });

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error('AS Calc failed:', error);
      const errorEmbed = createEmbed({
        title: 'Calculation Failed',
        description: 'There was a problem generating the result. Please try again later.',
        color: 0xff0000,
        fields: [{ name: 'Error', value: `${error.message ?? 'Unknown error'}`, inline: false }],
        interaction,
      });
      await interaction.editReply({ embeds: [errorEmbed] });
    }
  },
};
