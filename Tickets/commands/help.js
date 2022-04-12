const { MessageEmbed, MessageButton, MessageActionRow, } = require('discord.js');


module.exports = {
    data: {
        name: 'help',
        type: 1,
        description: 'Open the help menu!'
    },
    async execute(interaction, client, args) {
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


    const curPage = await interaction.editReply({ embeds: [pages[page]], components: [row], fetchReply: true });
    console.log(curPage);

    const collector = await curPage.createMessageComponentCollector({
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
