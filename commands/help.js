const { EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
 
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
 
 
        const button_1 = new ButtonBuilder()
            .setCustomId('Right')
            .setEmoji("➡️")
            .setLabel('Next')
            .setStyle(ButtonStyle.Secondary);
 
        const button_2 = new ButtonBuilder()
            .setCustomId('Left')
            .setEmoji("⬅️")
            .setLabel('Prev')
            .setStyle(ButtonStyle.Secondary);
 
        const button_3 = new ButtonBuilder()
            .setCustomId('Stop')
            .setEmoji('<a:xmark:963582538104852500>')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Primary)
 
      const button_4 = new ButtonBuilder()
            .setURL('https://www.google.ca/')
            .setLabel('Vote')
            .setStyle(ButtonStyle.Link)
 
        const row = new ActionRowBuilder( {components: [button_4, button_2, button_1, button_3], type: "BUTTON" } );
        let page = 0;
        const pages = [
            new EmbedBuilder().setTitle('p1').setDescription('Here are the important links you need when using waffle!\n ╭✧ docs.waffle-bot.me\n ︰https://discord.gg/DSwqChkRz5\n ╰✧Upcoming dashboard?').setFooter('Page 1 of 4').setThumbnail(client.user.displayAvatarURL()),
            new EmbedBuilder().setTitle('p2').setDescription('A few commands to get you started with your adventure\n ╭✧/setup: allows you to configure the bot according to your server\n :/add adds a user to the ticket\n :/new creates a ticket\n ╰✧/help is where you are at! Congrats for finding it. ').setFooter('Page 2 of 4').setThumbnail(client.user.displayAvatarURL()),
            new EmbedBuilder().setTitle('p3').setDescription('page3').setFooter('Page 3 of 4').setThumbnail(client.user.displayAvatarURL()),
            new EmbedBuilder().setTitle('p4').setDescription('page4').setFooter('Page 4 of 4').setThumbnail(client.user.displayAvatarURL())
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
                const disableRow = new ActionRowBuilder( {components: [button_4.setDisabled(true), button_2.setDisabled(true), button_1.setDisabled(true), button_3.setDisabled(true)], type: "BUTTON" } );
                currPage.edit({
                    embeds: [pages[page]], components: [disableRow]
                });
            }
        });
    }
}
    }
}
