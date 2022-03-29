
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'interactionCreate',
    async execute(int) {
        if (!int.isCommand()) return;
        if (!['setup', 'new'].includes(int.commandName)) return;
        const command = int.client.slashCommands.get(int.commandName);
        await command.execute(int);
    }
};


