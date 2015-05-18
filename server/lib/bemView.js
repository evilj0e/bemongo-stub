var path = require('path'),
    environment = 'development';

var defaults = {
    templateRoot: './',
    bundleName: 'desktop',
    availableBundles: ['desktop', 'touch', 'mobile'],
    languageId: 'ru'
};

var noop = function () {};

/**
 *
 * @param {String} [bundleName]
 * @param {String} [languageId]
 * @param {String} [templateRoot]
 * @param {String} [availableBundles]
 * @constructor
 *
 * @example
 *
 * var view = new BemView('../static/', 'touch', 'ru', ['desktop', 'touch]);
 *
 * view.render('index', {}, function (err, html) {
* console.log(html);
* });
 */
var BemView = function (bundleName, languageId, templateRoot, availableBundles) {
    this.templateRoot = templateRoot || defaults.templateRoot;

    this.availableBundles = availableBundles || defaults.availableBundles;
    this.availableBundles = this.availableBundles.reduce(function (bundles, bundle) {
        bundles[bundle] = true;

        return bundles;
    }, {});

    this.bundleName = bundleName || defaults.bundleName;
    if (!(this.bundleName in this.availableBundles)) {
        this.bundleName = defaults.bundleName;
    }

    this.languageId = languageId || defaults.languageId;
};

/**
 *
 * @param {Object} [options]
 * @param {String} [options.templateRoot]
 * @param {String} [options.bundleName]
 * @param {String} [options.languageId]
 * @param {String} [options.availableBundles]
 */
BemView.defaults = function (options) {
    options = options || {};
    defaults.templateRoot = options.templateRoot || defaults.templateRoot;
    defaults.bundleName = options.bundleName || defaults.bundleName;
    defaults.languageId = options.languageId || defaults.languageId;
    defaults.availableBundles = options.availableBundles || defaults.availableBundles;
};

/**
 *
 * @param {String} templateName
 * @param {Object} [options]
 * @param {Function} [cb]
 */
BemView.prototype.render = function (templateName, options, cb) {
    options = options || {};
    cb = cb || noop;
    var bundleDir = path.join(this.templateRoot, this.bundleName + '.bundles', templateName),
        privFile = path.join(bundleDir, templateName + '.priv.' + this.languageId + '.js'),
        bemhtmlFile = path.join(bundleDir, templateName + '.bemhtml.js');

    try {
        if (environment === 'development') {
            delete require.cache[require.resolve(privFile)];
            delete require.cache[require.resolve(bemhtmlFile)];
        }

        var priv = require(privFile),
            bemhtml = require(bemhtmlFile).BEMHTML;

        var html = bemhtml.apply(priv.exec('b-page', options, templateName));

        cb(null, html);
    } catch (err) {
        cb(err);
    }
};

module.exports = BemView;
