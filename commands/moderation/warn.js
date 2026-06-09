const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { createEmbed } = require('../../utils/embed');
const Warning = require('../../schemas/warnings');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Issue a warning to a server member')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The member to warn')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('Reason for the warning')
				.setRequired(false))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.setDMPermission(false),

	async execute(interaction) {
		const targetUser = interaction.options.getUser('user');
		const reason = interaction.options.getString('reason') ?? 'No reason provided';

		try {
			const warning = await Warning.create({
				guildId: interaction.guildId,
				userId: targetUser.id,
				moderatorId: interaction.user.id,
				reason,
			});

			const total = await Warning.countDocuments({
				guildId: interaction.guildId,
				userId: targetUser.id,
			});

			const embed = createEmbed({
				title: 'Warning Issued',
				description: `**${targetUser.tag}** has been warned.`,
				color: 0xff5500,
				fields: [
					{ name: 'Warning ID', value: warning.id, inline: false },
					{ name: 'Reason', value: reason, inline: false },
					{ name: 'Total Warnings', value: `${total}`, inline: true },
				],
				interaction,
			});

			await interaction.reply({ embeds: [embed] });
		} catch (error) {
			console.error('Warn command failed:', error);
			await interaction.reply({ content: 'Unable to issue a warning right now.', ephemeral: true });
		}
	},
};
