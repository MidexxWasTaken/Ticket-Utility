const { MessageEmbed, MessageButton, MessageActionRow, } = require('discord.js');


module.exports = {
    data: {
        name: 'help',
        type: 1,
        description: 'Open the help menu!'
    },
    async execute(interaction, client, args) {
        //has the interaction already been deferred? If not, defer the reply.
        if (interaction.deferred == false) {
            await interaction.deferReply();
        }
      
      
        const button_1 = new MessageButton()
            .setCustomId('Right')
            .setEmoji("➡️")
            .setLabel('Next')
            .setStyle('SECONDARY');
  
        const button_2 = new MessageButton()
            .setCustomId('Left')
            .setEmoji("⬅️")
            .setLabel('Prev')
            .setStyle('SECONDARY');
  
        const button_3 = new MessageButton()
            .setCustomId('Stop')
            .setEmoji('<a:xmark:963582538104852500>')
            .setLabel('Cancel')
            .setStyle('PRIMARY')

      const button_4 = new MessageButton()
            .setURL('https://www.google.ca/')
            .setLabel('Vote')
            .setStyle('LINK')
  
        const row = new MessageActionRow( {components: [button_4, button_2, button_1, button_3], type: "BUTTON" } );
        let page = 0;
        const pages = [
            new MessageEmbed().setTitle('Help Menu').setDescription('This is all the commands you can use!').addField('Help', '/help Help menu!', false).addField('Setup', '/setup Setup the bot!', false).addField('New', '/new Help menu!', false).setFooter('Page 1 of 4').setThumbnail(client.user.displayAvatarURL()),
            new MessageEmbed().setTitle('Ressources').setDescription('These are some useful ressources!').addField('Website', 'https://www.waffleticketbot.tk', false).addField('Documentation', 'https://waffle.waffleticketbot.tk/', false).addField('Invite', '[Invite the bot!](https://discord.com/api/oauth2/authorize?client_id=888552245661151242&permissions=2147568656&scope=bot%20applications.commands)', false).setFooter('Page 2 of 4').setThumbnail(client.user.displayAvatarURL()),
            new MessageEmbed().setTitle('Quick support').setDescription('Quick FAQ').addField('How to add the bot?', 'Go in the previous help menu and click "Invite the bot"', false).addField('How to setup', 'Run /setup and provide the required fields', false).addField('Is the bot open source?', 'Yes it is! But the github isnt ready for the moment', false).setThumbnail(client.user.displayAvatarURL()).setFooter('Page 3 of 4'),
            new MessageEmbed().setTitle('Credits').setDescription('Thank you page!').addField('Help', 'Thank you to kbtalkin#0012 for helping me so much with this bot', false).addField('I dont remember your user credits','Also thank you to everybody else who helped me develop this bot.', false).setFooter('Page 4 of 4').setThumbnail(client.user.displayAvatarURL())
        ];
  
  
        const currPage = await interaction.editReply({ embeds: [pages[page]], components: [row], fetchReply: true });
        // console.log(currPage);
  
        const collector = await currPage.createMessageComponentCollector({
          filter: (i) => (i.isButton() || i.isSelectMenu()) && i.user && i.message.author.id == client.user.id,
          time: 180e3
        });
        //console.log(collector)
        collector.on("collect", async(b) => {
            try {
                if (b.isButton()) {
                    if (b.user.id !== interaction.user.id)
                        return b.reply({
                            content: "ERROR: You can't interact with this message",
                            ephemeral: true
                        });
                    switch(b.customId) {
                        case 'Left':
                        if (page !== 0) {
                            page -= 1;
                            
                        } else {
                            page = pages.length - 1;
                        }
                        break;
                        case 'Right':
                        if (page < pages.length - 1) {
                            page++;  
                        } else {
                            page = 0;
                        }
                        break;
                        case 'Stop':
                        // await b.update({ content: 'Stopped', components: [] })
                        collector.stop()
                        break;
                    }
                    await b.deferUpdate();
                    await b.editReply({
                        embeds: [pages[page]],
                        components: [row]
                    }).catch(e => {})
                    collector.resetTimer();
                }
            } catch (e) {
                console.log(e.stack ? String(e.stack) : String(e))
                console.log(String(e))
            }
        });
        collector.on('end', (_, reason) => {
            if (reason !== 'messageDelete') {
                const disableRow = new MessageActionRow( {components: [button_4.setDisabled(true), button_2.setDisabled(true), button_1.setDisabled(true), button_3.setDisabled(true)], type: "BUTTON" } );
                currPage.edit({
                    embeds: [pages[page]], components: [disableRow]
                });
            }
        });
    }
}