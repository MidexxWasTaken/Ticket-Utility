const fs = require('fs');

const file_check = async (ruta) => {
    try {
        delete require.cache[require.resolve(ruta)];
        const status = require(ruta);
        return status;
    } catch (error) {
        return false;
    }
}

const file_write = (path, data = {}) => {
  let writeData = data;
  if (typeof data === 'object') writeData = JSON.stringify(data );
  fs.writeFileSync(path, writeData, { encoding: 'utf8' });
}

module.exports = {
    file_check,
    file_write
}