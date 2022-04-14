
const { Client, Collection, MessageEmbed } = require('discord.js');
const bot = require(`${__dirname}/config/Bot.json`);
const chalk = require('chalk')

const client = new Client({
    intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_PRESENCES'],
    partials: ['GUILD_MEMBER', 'USER', 'MESSAGE'],
    restGlobalRateLimit: 50,
    retryLimit: 2
});

client.slashCommands = new Collection();
client.sts = {
    dir: __dirname,
    token: bot.token,
    app: bot.applicationID
};

client.once('ready', async () => {
    console.log(chalk.green(`  [ DISCORD ] Logged in as ${client.user.tag}!`));
    client.slashCommands.forEach(cmd => {
        console.log(chalk.green(`  [ SLASH ] Loaded ${cmd.data.name}.js ...`));
    });
    console.log(chalk.green('  [ BOT ] Buying some waffles...'))
    const slashCommandsArray = [...new Set(client.slashCommands.map( cmd => cmd.data ))];
    console.log(`${client.user.tag} has logged into the following servers:`);
    client.guilds.cache.map(async guild => {
        console.log(`    -  ${guild.name}`);
        await guild.commands.set(slashCommandsArray);
    })
    console.log(chalk.yellow(' [ READY ] Waffle is online and ready to eat waffles!'))
});

['slashCmd', 'events'].forEach(handler => {
    require(`${__dirname}/handlers/${handler}`)(client);
});

client.on("ready", () => {
    client.user.setActivity('/help', { type: 'LISTENING'});
})

const JoinEmbed = new MessageEmbed().setDescription('Hey there! My name is **Waffle**').addField('How to start', 'To get started, either run /help or set the bot up with /setup', false).addField('Important Links', '[Invite the bot!](https://discord.com/api/oauth2/authorize?client_id=888552245661151242&permissions=2147568656&scope=bot%20applications.commands) - Add the bot to one of your amazing servers and provide help to your members!').addField('\u200b', '[Website](https://www.waffleticketbot.tk) - The official website of the bot where you can see command and documentation to help if you are a bit lost.', false)
client.on('guildCreate', guild => {
const channel = guild.channels.cache.get(guild.systemChannelId);
channel.send({embeds: [JoinEmbed]})
})

client.login(bot.token);