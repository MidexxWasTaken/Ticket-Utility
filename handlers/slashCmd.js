
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

const cmd_slash = [];
module.exports = (client) => {
    const commands = fs.readdirSync(`${client.sts.dir}/commands/`).filter(file => file.endsWith('.js'));

    for (const cmd of commands) {
        const slash = require(`${client.sts.dir}/commands/${cmd}`);

        try {
            if (!['setup', 'new', 'help', 'add'].includes(slash.data.name)) continue;
            client.slashCommands.set(slash.data.name, slash);
            cmd_slash.push(slash.data);
        } catch (error) {
            console.error('   [ X ] SlashCommands:', error.message);
        }
    }

    const rest = new REST({ version: '10' }).setToken(client.sts.token);

    (async () => {
        try {
            await rest.put(Routes.applicationCommands(client.sts.app), { body: cmd_slash });
        } catch (error) {
            console.error('   [ X ] Slash:', error.message);
        }
    })();
};
