
const { Client, Collection, MessageEmbed, interactionCreate } = require('discord.js');
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

client.once('ready', () => {
    console.log(chalk.green(`  [ DISCORD ] Logged in as ${client.user.tag}!`));
    console.log(chalk.green('  [ COMMANDS ] Loaded new.js...'))
    console.log(chalk.green('  [ COMMANDS ] Loaded setup.js...'))
    console.log(chalk.green('  [ BOT ] Buying some waffles...'))
    console.log(chalk.yellow(' [ READY ] Waffle is online and ready to eat waffles!'))
});

client.emit('interactionCreate', null);
client.on('interactionCreate', interaction)

['events', 'slashCmd'].forEach(fl => {
    require(`${__dirname}/handlers/${fl}`)(client);
});

client.login(bot.token);