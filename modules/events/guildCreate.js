const { bot } = require('../../index');

bot.on('guildCreate', async guild => {
  const { config, discord } = bot.tools
  
  const e = new discord.RichEmbed()
    .setTitle('New Guild Joined!')
    .setColor(config.colors.success)
    .setDescription(`I have just joined ${guild.name} with the id of ${guild.id}`)
    .setFooter(getTime())
  return bot.channels.get("id", config.console).send(e);
});

function getTime() {
	let date = new Date();

	if (date.getHours() >= 13) {
		return date.getHours() - 12 + ':' + date.getMinutes() + ' PM';
	} else {
		return date.getHours() + ':' + date.getMinutes() + ' AM';
	}
}
