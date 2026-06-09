const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { createEmbed } = require('../../utils/embed');
const Warning = require('../../schemas/warnings');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warnings')
		.setDescription('List warnings for a server member')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The member to check warnings for')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.setDMPermission(false),

	async execute(interaction) {
		const targetUser = interaction.options.getUser('user');
		const warnings = await Warning.find({
			guildId: interaction.guildId,
			userId: targetUser.id,
		}).sort({ createdAt: -1 });

		if (!warnings.length) {
			const embed = createEmbed({
				title: 'No Warnings Found',
				description: `**${targetUser.tag}** has no warnings in this server.`,
				color: 0x00ff99,
				interaction,
			});

			return interaction.reply({ embeds: [embed] });
		}

		const recent = warnings.slice(0, 5).map((warning, index) => {
			return `**${index + 1}.** ${warning.reason} — <t:${Math.floor(warning.createdAt.getTime() / 1000)}:R>`;
		}).join('\n');

		const embed = createEmbed({
			title: 'Member Warnings',
			description: `Showing warnings for **${targetUser.tag}**`,
			color: 0xff9900,
			fields: [
				{ name: 'Total Warnings', value: `${warnings.length}`, inline: true },
				{ name: 'Recent Warnings', value: recent, inline: false },
			],
			interaction,
		});

		await interaction.reply({ embeds: [embed] });
	},
};
