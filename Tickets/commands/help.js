const { MessageEmbed } = require('discord.js');


module.exports = {
    data: {
        name: 'help',
        type: 1,
        description: 'Open the help menu!'
    },
    execute(client, message, args) {
        const embed = new MessageEmbed();

        embed.setColor('BLUE');
        embed.setTitle(Help-Panel);
        embed.setThumbnail(client.user.displayAvatarURL())
        const commands = client.commands.filter(x => x.showHelp !== false);

        embed.setDescription('/help Help menu!') ;
        embed.addField('/new New ticket!');
        embed.addField('/setup Setup the bot!');
        embed.setTimestamp();
        embed.setFooter('Music Bot Commands - Edited by Midexx ❤️', message.author.avatarURL({ dynamic: true }));
        message.channel.send({ embeds: [embed] });
    },
};
