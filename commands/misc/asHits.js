const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ashits')
    .setDescription('Calculates the amount of hits between two experience amounts. Only made for the dummies in SafeZone.')
    .addIntegerOption(option =>
      option.setName('firstlevel')
        .setDescription('What is your starting level?')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('firstexp')
        .setDescription('What is your starting EXP?')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('endlevel')
        .setDescription('What is your final level?')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('endexp')
        .setDescription('What is your final EXP?')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('multiplier')
        .setDescription('What gamepass multiplier do you have?')
        .setRequired(true)
        .addChoices(
          { name: 'No multi', value: 1 },
          { name: '8x multi', value: 8 },
          { name: '13x multi', value: 13 },
        )),

  async execute(interaction) {
    await interaction.deferReply();

    const sLevel = interaction.options.getInteger('firstlevel');
    const sEXP   = interaction.options.getInteger('firstexp');
    const eLevel = interaction.options.getInteger('endlevel');
    const eEXP   = interaction.options.getInteger('endexp');
    const multi  = interaction.options.getInteger('multiplier');

    if (eLevel < sLevel || (eLevel === sLevel && eEXP < sEXP)) {
      const invalidEmbed = createEmbed({
        title: 'Invalid Range',
        description: 'Your ending level/EXP must be greater than or equal to your starting level/EXP.',
        color: 0xff0000,
        interaction,
      });
      return await interaction.editReply({ embeds: [invalidEmbed] });
    }

    let cLevel = sLevel;
    let currentEXP = sEXP;
    let hits = 0;
    let totalEXPGain = 0;
    let error = false;

    const levelCap = (lvl) => lvl * 1000;

    try {
      while (cLevel < eLevel || (cLevel === eLevel && currentEXP < eEXP)) {
        const cap = levelCap(cLevel);
        const expPerHit = (1000 * multi) + cLevel;

        if (cLevel === eLevel) {
          const need = eEXP - currentEXP;
          const hitsFinal = Math.ceil(need / expPerHit);
          const gainedFinal = hitsFinal * expPerHit;

          hits += hitsFinal;
          totalEXPGain += gainedFinal;
          currentEXP += gainedFinal;
          break;
        }

        const need = cap - currentEXP;
        const hitsThis = Math.ceil(need / expPerHit);
        const gained = hitsThis * expPerHit;

        hits += hitsThis;
        totalEXPGain += gained;
        currentEXP += gained - cap;
        cLevel += 1;
      }
    } catch (err) {
      error = true;
      console.error("Error in ashits calc:", err);
    }

    // Reply
    if (error) {
      const errorEmbed = createEmbed({
        title: 'Calculation Error',
        description: '❌ There was an error in the calculation. Please contact the developer.',
        color: 0xff0000,
        interaction,
      });
      await interaction.editReply({ embeds: [errorEmbed] });
    } else {
      const resultEmbed = createEmbed({
        title: 'Hit Calculation Results',
        description: 'Total hits and experience gain for the provided range.',
        color: 0x0099ff,
        fields: [
          { name: 'Total Hits', value: `${hits.toLocaleString()}`, inline: true },
          { name: 'Total EXP Gain', value: `${totalEXPGain.toLocaleString()}`, inline: true },
          { name: 'Multiplier', value: `${multi}x`, inline: true },
        ],
        interaction,
      });
      await interaction.editReply({ embeds: [resultEmbed] });
    }
  },
};
