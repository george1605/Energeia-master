const path = require('path');

module.exports = {
    entry: '../code.js',
    output: {
        path: path.resolve(__dirname, '../'),
        filename: 'bundle.js',
    },
};