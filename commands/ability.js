const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('abilityroll')
		.setDescription('Rolls a set of 4d6, re-rolls any 1s and removes the lowest die'),
	async execute(interaction) {
		const wait = require('node:timers/promises').setTimeout;
		var die = [0,0,0,0];
		var strOutput = '';

		await interaction.deferReply();

		for (j = 0; j < 6; j++){
			die = [0,0,0,0];
			die[0] = (1 + Math.floor(Math.random() * 6))
			die[1] = (1 + Math.floor(Math.random() * 6))
			die[2] = (1 + Math.floor(Math.random() * 6))
			die[3] = (1 + Math.floor(Math.random() * 6))

	    for(i = 0; i < 4; i++){
				while (die[i] === 1) die[i] = (1 + Math.floor(Math.random() * 6));
	    }
			die.sort();
			rolledAbility = die[1] + die[2] + die[3];
			strOutput = (strOutput + '*Sorted dice: *`' + die[0] + ', ' + die[1] + ', ' + die[2] + ', ' + die[3] + '`\n:white_circle: Ability Score: **' + rolledAbility + '**\n');
			/*if (j === 0) {
				await wait(1);
				await interaction.editReply('Sorted dice: ``' + die[0] + ', ' + die[1] + ', ' + die[2] + ', ' + die[3] + '``\nAbility Score: **' + rolledAbility + '**');
			}
			else await interaction.followUp('Sorted dice: ``' + die[0] + ', ' + die[1] + ', ' + die[2] + ', ' + die[3] + '``\nAbility Score: **' + rolledAbility + '**');*/
		}
		await wait(1);
		await interaction.editReply(strOutput);
	},
};
