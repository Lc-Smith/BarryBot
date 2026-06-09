const { EmbedBuilder } = require('discord.js');

function createEmbed({ title, description, fields = [], color, interaction, footer }) {
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setColor(color)
    .setFields(fields)
    .setTimestamp();

  if (description) {
    embed.setDescription(description);
  }

  if (footer) {
    embed.setFooter(footer);
  } else if (interaction) {
    embed.setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });
  }

  return embed;
}

module.exports = { createEmbed };