const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kicking command for administrators')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('The member to kick')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('The reason for kicking')
            .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDMPermission(false),
	async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';

        try {
            await interaction.guild.members.kick(user, reason);
            const embed = createEmbed({
                title: 'Member Kicked',
                description: `Successfully kicked **${user.tag}**.`,
                color: 0xff6600,
                fields: [
                    { name: 'Reason', value: reason, inline: false },
                ],
                interaction,
            });
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Kick command failed:', error);
            const errorEmbed = createEmbed({
                title: 'Kick Failed',
                description: `Could not kick **${user.tag}**.`,
                color: 0xff9900,
                fields: [
                    { name: 'Error', value: `${error.message}`, inline: false },
                ],
                interaction,
            });
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
	},
};
