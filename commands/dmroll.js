const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dmroll')
		.setDescription('Private roll a die or set of dice')
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

    if (roller.includes('+')) dmaddRoll();
    else if (roller.includes('-')) dmtakeRoll();
    else if (!roller.includes('-') && (!roller.includes('+'))) dmRoll();

    function dmaddRoll() {
      const add = parseInt(roller.split('+')[1], 10);
      for(i = 0; i < dice; i++){
        diceOutput = (1 + Math.floor(Math.random() * sides));
        output = output + (diceOutput + add);
        strOutput = strOutput + diceOutput + " ";
      }
			interaction.deferReply({ephemeral: true});
			if (diceOutput === sides) interaction.editReply('`' + roller + '` (' + strOutput + ') + ' + add + ' = ' + output + ". That's a crit! :D");
			else if (diceOutput === 1) interaction.editReply('`' + roller + '` (' + strOutput + ') + ' + add + ' = ' + output + ". That's a crit fail :(");
			else interaction.reply('`' + roller + '` (' + strOutput + ') + ' + add + ' = ' + output);
    }
    function dmtakeRoll() {
      const take = parseInt(roller.split('-')[1], 10);
      for(i = 0; i < dice; i++){
        diceOutput = (1 + Math.floor(Math.random() * sides));
        output = output + (diceOutput - take);
        strOutput = strOutput + diceOutput + " ";
      }
			interaction.deferReply({ephemeral: true});
			if (diceOutput === sides) interaction.editReply('`' + roller + '` (' + strOutput + ') - ' + take + ' = ' + output + ". That's a crit! :D");
			else if (diceOutput === 1) interaction.editReply('`' + roller + '` (' + strOutput + ') - ' + take + ' = ' + output + ". That's a crit fail :(");
			else interaction.editReply('`' + roller + '` (' + strOutput + ') - ' + take + ' = ' + output);
    }
    function dmRoll() {
      for(i = 0; i < dice; i++){
        diceOutput = (1 + Math.floor(Math.random() * sides));
        output = output + diceOutput;
      }
			interaction.deferReply({ephemeral: true});
			if (diceOutput === sides) interaction.reply('`' + roller + '` = ' + diceOutput + ". That's a crit! :D");
			else if (diceOutput === 1) interaction.reply('`' + roller + '` = ' + diceOutput + ". That's a crit fail :(");
			else interaction.reply('`' + roller + '` = ' + diceOutput);
		}
	},
};
