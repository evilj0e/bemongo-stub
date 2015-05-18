var path = require('path'),
    Vow = require('vow'),
    vowFs = require('vow-fs'),
    BorschikPreprocessor = require('enb/lib/preprocess/borschik-preprocessor');

module.exports = require('enb/lib/build-flow').create()
    .name('priv-js')
    .target('target', '?.priv.js')
    .defineOption('privFile', '')
    .defineOption('mode', 'development')
    .useFileList(['priv.js'])
    .needRebuild(function(cache) {
        this._privFile = this._privFile || '.enb/enb/lib/priv.js';
        this._privFile = this.node._root + '/' + this._privFile;
        return cache.needRebuildFile('priv-file', this._privFile);
    })
    .saveCache(function(cache) {
        cache.cacheFileInfo('priv-file', this._privFile);
    })
    .builder(function(privFiles) {

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

            return Vow.all(privFiles.map(function(file) {
                return _this.node.createTmpFileForTarget(target).then(function(tmpfile) {
                    return jsBorschikPreprocessor.preprocessFile(file.fullname, tmpfile, false, false).then(function() {
                        return vowFs.read(tmpfile, 'utf8').then(function(data) {
                            vowFs.remove(tmpfile);
                            return data;
                        });
                    });
                });
            })).then(function(res) {
                return vowFs.read(_this._privFile, 'utf8')
                    .then(function(privFile) {
                        return [
                            buildSource(privFile, 'var Blocks = (function() {\nvar module = {}', 'return module.exports\n})();'),
                            'var blocks = new Blocks();',
                            res.map(function(item) {
                                return buildSource(item, '(function(blocks) {', 'module.exports(blocks)\n})(blocks);');
                            }).join('\n'),
                            'module.exports = blocks;'
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
                buildRequire(this._privFile, 'var Blocks = '),
                'var blocks = new Blocks();',
                privFiles.map(function(file) {
                    return buildRequire(file.fullname, '', '(blocks)');
                }).join('\n'),
                'module.exports = blocks;'
            ].join('\n');
        }

    })
    .createTech();
