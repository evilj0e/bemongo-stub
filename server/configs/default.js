var path = require('path'),
    root = path.join(__dirname, '../..');

module.exports = {
    view: {
        templateRoot: path.join(root, 'static'),
        bundleName: 'desktop',
        availableBundles: ['desktop'],
        languageId: 'ru'
    }
};