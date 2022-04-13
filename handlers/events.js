
const fs = require('fs');

module.exports = (client) => {
    const dirs = fs.readdirSync(`${client.sts.dir}/events/`).filter(file => file.endsWith('.js'));
    
    for (const file of dirs) {
        const event = require(`${client.sts.dir}/events/${file}`);

        try {
            console.log(`LOADING EVENT:  ${event.name}`)
                      if (event.once) {
                          client.once(event.name, (...args) => event.execute(...args));
                      } else {
                          client.on(event.name, (...args) => event.execute(...args));
                      }
                  } catch (error) {
                      console.error('  [ X ] Events:', error.message);
                  }
              }
};



