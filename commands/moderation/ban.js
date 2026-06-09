const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Banning command for administrators')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('The member to ban')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('The reason for banning')
            .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),
	async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';

        try {
            await interaction.guild.members.ban(user, { reason });
            const embed = createEmbed({
                title: 'Member Banned',
                description: `Successfully banned **${user.tag}**.`,
                color: 0xff0000,
                fields: [
                    { name: 'Reason', value: reason, inline: false },
                ],
                interaction,
            });
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Ban command failed:', error);
            const errorEmbed = createEmbed({
                title: 'Ban Failed',
                description: `Could not ban **${user.tag}**.`,
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
