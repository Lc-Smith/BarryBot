const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unmute')
		.setDescription('Remove a timeout from a server member')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The member to unmute')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('Reason for removing the timeout')
				.setRequired(false))
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
		.setDMPermission(false),

	async execute(interaction) {
		const targetUser = interaction.options.getUser('user');
		const member = await interaction.guild.members.fetch(targetUser.id).catch(() => null);
		const reason = interaction.options.getString('reason') ?? 'No reason provided';

		if (!member) {
			return interaction.reply({ content: 'Could not find that member in this server.', ephemeral: true });
		}

		if (!member.isCommunicationDisabled()) {
			return interaction.reply({ content: 'That member is not currently muted.', ephemeral: true });
		}

		try {
			await member.timeout(null, reason);
			const embed = createEmbed({
				title: 'Member Unmuted',
				description: `Removed timeout for **${targetUser.tag}**.`,
				color: 0x00ff99,
				fields: [
					{ name: 'Reason', value: reason, inline: false },
				],
				interaction,
			});

			await interaction.reply({ embeds: [embed] });
		} catch (error) {
			console.error('Unmute command failed:', error);
			const errorEmbed = createEmbed({
				title: 'Unmute Failed',
				description: `Could not remove timeout for **${targetUser.tag}**.`,
				color: 0xff0000,
				fields: [
					{ name: 'Error', value: error.message, inline: false },
				],
				interaction,
			});
			await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}
	},
};
