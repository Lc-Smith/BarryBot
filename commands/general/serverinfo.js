const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Shows information about this server'),

	async execute(interaction) {
		const guild = interaction.guild;
		const owner = await guild.fetchOwner().catch(() => null);

		const channelCounts = {
			text: guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size,
			voice: guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size,
			categories: guild.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).size,
		};

		const embed = createEmbed({
			title: 'Server Information',
			description: `Details for **${guild.name}**`,
			color: 0x6a00ff,
			fields: [
				{ name: 'Server ID', value: guild.id, inline: true },
				{ name: 'Owner', value: owner ? `${owner.user.tag}` : `<@${guild.ownerId}>`, inline: true },
				{ name: 'Member Count', value: `${guild.memberCount}`, inline: true },
				{ name: 'Roles', value: `${guild.roles.cache.size}`, inline: true },
				{ name: 'Channels', value: `Text: ${channelCounts.text}\nVoice: ${channelCounts.voice}\nCategories: ${channelCounts.categories}`, inline: true },
				{ name: 'Boosts', value: `${guild.premiumSubscriptionCount ?? 0}`, inline: true },
				{ name: 'Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: false },
			],
			interaction,
		});

		await interaction.reply({ embeds: [embed] });
	},
};
