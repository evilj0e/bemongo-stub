var path = require('path'),
    Vow = require('vow'),
    vowFs = require('vow-fs'),
    BorschikPreprocessor = require('enb/lib/preprocess/borschik-preprocessor');

module.exports = require('enb/lib/build-flow').create()
    .name('bh-server')
    .target('target', '?.bemhtml.js')
    .defineOption('bhFile', '')
    .defineOption('mode', 'development')
    .useFileList(['bh.js'])
    .needRebuild(function(cache) {
        this._bhFile = this._bhFile || 'node_modules/bh/lib/bh.js';
        this._bhFile = this.node._root + '/' + this._bhFile;
        return cache.needRebuildFile('bh-file', this._bhFile);
    })
    .saveCache(function(cache) {
        cache.cacheFileInfo('bh-file', this._bhFile);
    })
    .builder(function(bhFiles) {

        var _this = this,
            node = _this.node,
            target = this._target,
            jsBorschikPreprocessor = new BorschikPreprocessor();

        if (_this._mode === 'production') {

            var buildSource = function(item, pre, post) {
                return [
                    pre || '',
                    item,
                    post || ''
                ].join('\n');
            };

            return Vow.all(bhFiles.map(function(file) {
                return _this.node.createTmpFileForTarget(target).then(function(tmpfile) {
                    return jsBorschikPreprocessor.preprocessFile(file.fullname, tmpfile, false, false).then(function() {
                        return vowFs.read(tmpfile, 'utf8').then(function(data) {
                            vowFs.remove(tmpfile);
                            return data;
                        });
                    });
                });
            })).then(function(res) {
                return vowFs.read(_this._bhFile, 'utf8')
                    .then(function(bhFile) {
                        return [
                            buildSource(bhFile, 'var BH = (function() {\nvar module = {}', 'return module.exports\n})();'),
                            'var bh = new BH();',
                            res.map(function(item) {
                                return buildSource(item, '(function(bh) {', 'module.exports(bh)\n})(bh);');
                            }).join('\n'),
                            'module.exports = bh;',
                            'bh.BEMHTML = { apply: function(bemjson) { return bh.apply(bemjson); } };'
                        ].join('\n');
                    });
            });

        } else {

            var buildRequire = function(absPath, pre, post) {
                var relPath = node.relativePath(absPath);
                return [
                    'delete require.cache[require.resolve("' + relPath + '")];',
                    (pre || '') + 'require("' + relPath + '")' + (post || '') + ';'
                ].join('\n');
            };
            return [
                buildRequire(this._bhFile, 'var BH = '),
                'var bh = new BH();',
                bhFiles.map(function(file) {
                    return buildRequire(file.fullname, '', '(bh)');
                }).join('\n'),
                'module.exports = bh;',
                'bh.BEMHTML = { apply: function(bemjson) { return bh.apply(bemjson); } };'
            ].join('\n');
        }

    })
    .createTech();
