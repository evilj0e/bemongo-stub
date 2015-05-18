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
 * @param {Request} req
 * @returns {{languageId: string, bundleName: string}}
 */
var getLanguageAndBundleByRequest = function (req) {
    var languageId = req.langdetect ? req.langdetect.id : void 0,
        bundleName = 'desktop';

    if (req.uatraits && req.uatraits.isMobile) {
        bundleName = req.uatraits.isTouch || req.uatraits.MultiTouch ? 'touch' : 'mobile';
    }

    return {
        languageId: languageId,
        bundleName: bundleName
    };
};

/**
 * Используем данные langdetect и uatraits для определения bundleName и languageId
 *
 * @param {Request} req
 * @returns {BemView}
 */
var getBemViewByRequest = function (req) {
    var data = module.exports.getLanguageAndBundleByRequest(req);

    return getBemView(data.bundleName, data.languageId);
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
            bemView = getBemViewByRequest(req);

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
module.exports.getLanguageAndBundleByRequest = getLanguageAndBundleByRequest;
