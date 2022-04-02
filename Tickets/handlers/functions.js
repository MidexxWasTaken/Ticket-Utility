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

const file_write = (path, data = {}, options = {}) => {
  fs.writeFileSync(path, data, options);
}

module.exports = {
    file_check,
    file_write
}