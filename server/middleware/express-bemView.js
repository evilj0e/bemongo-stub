/*!
 *
 * @example
 *
 * var app = express();
 *
 * require('express-bemView')(app, {
 * templateRoot: '../static',
 * bundleName: 'touch',
 * templateRoot: 'en',
 * availableBundles: ['touch', 'desktop']
 * });
 *
 * app.get('/', function (req, res) {
 * res.render('index', {
 * pewpew: 'ololo'
 * });
 * });
 */

var BemView = require('../lib/bemView');
var bemViewCache = {};

/**
 *
 * @param {String} bundleName
 * @param {String} languageId
 * @returns {BemView}
 */
var getBemView = function (bundleName, languageId) {
    var viewKey = bundleName + ':' + languageId;

    if (!(viewKey in bemViewCache)) {
        bemViewCache[viewKey] = new BemView(bundleName, languageId);
    }

    return bemViewCache[viewKey];
};

/**
 *
 * @param {Object} app
 * @param {Object} [viewOptions]
 * @param {String} [viewOptions.templateRoot='./']
 * @param {String} [viewOptions.bundleName='desktop']
 * @param {String} [viewOptions.languageId='ru']
 * @param {Array} [viewOptions.availableBundles]
 */
var expressBemView = function (app, viewOptions) {
    BemView.defaults(viewOptions || {});

    app.response.render = function (name, options, fn) {
        options = options || {};

        var self = this,
            req = this.req,
            bemView = getBemView({
                bundleName: viewOptions.bundleName,
                languageId: viewOptions.languageId
            });

        // support callback function as second arg
        if (typeof options === 'function') {
            fn = options;
            options = {};
        }

        // merge res.locals
        options._locals = self.locals;

        // default callback to respond
        fn = fn || function (err, str) {
            if (err) {
                return req.next(err);
            }
            self.send(str);
        };

        bemView.render(name, options, fn);
    };
};

module.exports = expressBemView;
