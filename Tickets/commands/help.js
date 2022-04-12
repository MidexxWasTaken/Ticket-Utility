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
            .setStyle('PRIMARY');
  
        const button_2 = new MessageButton()
            .setCustomId('Left')
            .setEmoji("⬅️")
            .setStyle('PRIMARY');
  
        const button_3 = new MessageButton()
            .setCustomId('Stop')
            .setEmoji('<a:stop:851111621433491467>')
            .setStyle('PRIMARY')
  
        const row = new MessageActionRow( {components: [button_2, button_3, button_1], type: "BUTTON" } );
        let page = 0;
        const pages = [
            new MessageEmbed().setTitle('Page 1').setDescription('This is page 1'),
            new MessageEmbed().setTitle('Page 2').setDescription('This is page 2'),
            new MessageEmbed().setTitle('Page 3').setDescription('This is page 3'),
            new MessageEmbed().setTitle('Page 4').setDescription('This is page 4')
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
                const disableRow = new MessageActionRow( {components: [button_2.setDisabled(true), button_3.setDisabled(true), button_1.setDisabled(true)], type: "BUTTON" } );
                currPage.edit({
                    embeds: [pages[page]], components: [disableRow]
                });
            }
        });
    }
}
