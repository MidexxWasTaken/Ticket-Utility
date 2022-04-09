const { MessageEmbed } = require('discord.js');


module.exports = {
    data: {
        name: 'help',
        type: 1,
        description: 'Open the help menu!'
    },
    execute(interaction, client, args) {
        const embed = new MessageEmbed();
        embed.setColor('BLUE');
        embed.setTitle('Help-Panel');
        embed.setThumbnail(client.user.displayAvatarURL())
        // const commands = client.commands.filter(x => x.showHelp !== false);

        embed.setDescription('Here are the commands available to you!');
        embed.addField('Help', '/help Help menu!', false) ;
        embed.addField('New','/new New ticket!', false );
        embed.addField('Setup', '/setup Setup the bot!', false);
        embed.setTimestamp();
        embed.setFooter({ text: 'Music Bot Commands - Edited by Midexx ❤️', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
        interaction.reply({ embeds: [embed] });
    },
};
