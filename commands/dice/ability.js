const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('abilityroll')
		.setDescription('Rolls a set of 4d6, re-rolls any 1s and removes the lowest die'),
	async execute(interaction) {
		const wait = require('node:timers/promises').setTimeout;
		let die = [0,0,0,0];
		let strOutput = '';

		await interaction.deferReply();

		for (let j = 0; j < 6; j++){
			die = [0,0,0,0];
			die[0] = (1 + Math.floor(Math.random() * 6))
			die[1] = (1 + Math.floor(Math.random() * 6))
			die[2] = (1 + Math.floor(Math.random() * 6))
			die[3] = (1 + Math.floor(Math.random() * 6))

			for (let i = 0; i < 4; i++){
				while (die[i] === 1) die[i] = (1 + Math.floor(Math.random() * 6));
			}
			
			die.sort();
			const rolledAbility = die[1] + die[2] + die[3];
			strOutput = (strOutput + '*Sorted dice:* `' + die[0] + ', ' + die[1] + ', ' + die[2] + ', ' + die[3] + '`\n:white_circle: Ability Score:** ' + rolledAbility + '**\n');
		}

		const embed = createEmbed({
			title: 'Ability Rolls',
			description: strOutput,
			color: 0x5E5E5E,
			interaction
		});

		await interaction.editReply({ embeds: [embed] });
	},
};