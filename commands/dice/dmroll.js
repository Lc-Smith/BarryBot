const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dmroll')
		.setDescription('Private roll a die or set of dice')
    .addStringOption(option =>
      option.setName('input')
        .setDescription('The dice roll')
        .setRequired(true)),
	async execute(interaction) {
		const roller = interaction.options.getString('input').trim();
		await interaction.deferReply({ ephemeral: true });

		const parsed = parseDiceNotation(roller);
		if (!parsed) {
			const invalidEmbed = createEmbed({
				title: 'Invalid Roll Format',
				description: 'Please use a format like `2d6`, `2d6+3`, or `2d6-1`.',
				color: 0xff0000,
				interaction,
			});
			return await interaction.editReply({ embeds: [invalidEmbed] });
		}

		const { dice, sides, modifier, sign } = parsed;
		const rolls = [];
		let total = 0;

		for (let i = 0; i < dice; i++) {
			const rollValue = 1 + Math.floor(Math.random() * sides);
			rolls.push(rollValue);
			total += rollValue;
		}

		if (sign === '+') total += modifier;
		if (sign === '-') total -= modifier;

		const fields = [
			{ name: 'Roll', value: `**${roller}**`, inline: false },
			{ name: 'Dice', value: rolls.join(' '), inline: false },
		];

		if (sign) {
			fields.push({ name: 'Modifier', value: `${sign} ${modifier}`, inline: true });
		}

		fields.push({ name: 'Total', value: `**${total}**`, inline: true });

		const embed = createEmbed({
			title: 'DM Rolls',
			description: `Result for **${roller}**`,
			fields,
			color: 0x5E5E5E,
			interaction,
		});

		await interaction.editReply({ embeds: [embed] });

		function parseDiceNotation(value) {
			const match = /^([1-9]\d*)d(\d+)([+-]\d+)?$/i.exec(value);
			if (!match) return null;
			return {
				dice: parseInt(match[1], 10),
				sides: parseInt(match[2], 10),
				modifier: match[3] ? parseInt(match[3], 10) : 0,
				sign: match[3] ? match[3][0] : null,
			};
		}
	},
};
