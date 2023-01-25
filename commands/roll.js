const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Roll a die or set of dice')
    .addStringOption(option =>
      option.setName('input')
        .setDescription('The dice roll')
        .setRequired(true)),
	async execute(interaction) {
		const wait = require('node:timers/promises').setTimeout;
    const roller = interaction.options.getString('input');
    const dice = parseInt(roller.split('d')[0], 10);
    const sides = parseInt(roller.split('d')[1], 10);
    var output = 0;
    var strOutput = '';
		var diceOutput = 0;

    if (roller.includes('+')) addRoll();
    else if (roller.includes('-')) takeRoll();
    else if (!roller.includes('-') && (!roller.includes('+'))) Roll();

    function addRoll() {
      const add = parseInt(roller.split('+')[1], 10);
      for(i = 0; i < dice; i++){
        diceOutput = (1 + Math.floor(Math.random() * sides));
        output = output + (diceOutput + add);
        strOutput = strOutput + diceOutput + " ";
      }
			if (diceOutput === sides) interaction.editReply('`' + roller + '` (' + strOutput + ') + ' + add + ' = ' + output + ". That's a crit! :D");
			else if (diceOutput === 1) interaction.editReply('`' + roller + '` (' + strOutput + ') + ' + add + ' = ' + output + ". That's a crit fail :(");
			else interaction.reply('`' + roller + '` (' + strOutput + ') + ' + add + ' = ' + output);
		}
    function takeRoll() {
      const take = parseInt(roller.split('-')[1], 10);
      for(i = 0; i < dice; i++){
        diceOutput = (1 + Math.floor(Math.random() * sides));
        output = output + (diceOutput - take);
        strOutput = strOutput + diceOutput + " ";
      }
			if (diceOutput === sides) interaction.editReply('`' + roller + '` (' + strOutput + ') - ' + take + ' = ' + output + ". That's a crit! :D");
			else if (diceOutput === 1) interaction.editReply('`' + roller + '` (' + strOutput + ') - ' + take + ' = ' + output + ". That's a crit fail :(");
			else interaction.editReply('`' + roller + '` (' + strOutput + ') - ' + take + ' = ' + output);
    }
    function Roll() {
      for(i = 0; i < dice; i++){
        diceOutput = (1 + Math.floor(Math.random() * sides));
        output = output + diceOutput;
      }
			if (diceOutput === sides) interaction.reply('`' + roller + '` = ' + diceOutput + ". That's a crit! :D");
			else if (diceOutput === 1) interaction.reply('`' + roller + '` = ' + diceOutput + ". That's a crit fail :(");
			else interaction.reply('`' + roller + '` = ' + diceOutput);
    }
	},
};
