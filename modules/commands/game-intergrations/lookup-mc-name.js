module.exports.run = async (bot, message, args, tools, data) => {
	// Variables
	const { config, discord, superagent, improperUsageWarn } = tools;
	// Code
	let username = args;
	if (args.length !== 0) {
		let history = await superagent.get(
			`https://some-random-api.ml/mc?username=${username}`
		);
		history = history.body;
		const e = new discord.RichEmbed()
			.setTitle(`${history.username}'s Minecraft Username History`)
			.setColor(config.colors.secondary)
			.setDescription(getDesc(history));
		return message.channel.send(e);
	} else {
		return improperUsageWarn('lookup-minecraft-username', message, data);
	}
	// Functions
	function getDesc(history) {
		if (history.name_history.length === 1) {
			return 'This user has not changed their name before.';
		} else {
			let desc;
			history.name_history.forEach(name => {
				if (desc == undefined) {
					desc = `**${name.name}** | ${name.changedToAt}\n`;
				} else {
					desc = desc + `**${name.name}** | ${name.changedToAt}\n`;
				}
			});
			return desc;
		}
	}
};

module.exports.config = {
	cmd: {
		main: 'lookup-minecraft-username',
		aliases: [
			'minecraft-name',
			'minecraft-username',
			'mc-user',
			'minecraft-user',
			'lookup-mc-username',
			'lookup-mc-name',
			'lookup-minecraft-name',
			'minecraft-name-history',
			'mc-name-history',
			'namemc'
		]
	},
	info: {
		name: 'Minecraft Username History',
		usage: 'lookup-minecraft-username <username>',
		aliases: 'minecraft-name, minecraft-name-history, namemc',
		description: 'Get the lyrics of a song.'
	},
	module: {
		main: 'integration',
		sub: 'game'
	},
	settings: {
		dm: false,
		restrictions: 0, // 0 - Everyone, 1 - Admin, 2 - Guild Owner, 3 - Dev Team
		premium: false,
		permissions: {
			bot: ['SEND_MESSAGES'],
			user: []
		}
	}
};
