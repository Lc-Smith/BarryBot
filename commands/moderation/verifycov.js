const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verifycov')
		.setDescription('Verification command for CoV')
        .addUserOption(option =>
            option.setName('member')
            .setDescription('The member to verify')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
        const guild = interaction.guild.id;
        if (guild === "1218377265377841162") {
            const member = interaction.options.getMember('member');
            const role = ('1218578042801225729');
            member.roles.add(role);
            await interaction.reply("<@" + member + "> verified.");
        } else {
            await interaction.reply('This command is not made for this server.');
        }
	},
};
