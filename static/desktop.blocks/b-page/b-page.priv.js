module.exports = function (blocks) {
    blocks.declare('b-page', function (data, page) {

        return [
            {
                block: 'b-page',
                title: 'Project stub on the BEM-methodology with the MongoDB',
                js: true,
                head: [
                    { elem: 'css', url: '/desktop.bundles/' + page + '/_' + page + '.css', ie: false },
                    { elem: 'css', url: '/desktop.bundles/' + page + '/_' + page, ie: true },
                    { elem: 'js', url: '//yastatic.net/jquery/1.8.3/jquery.min.js' },
                    { elem: 'js', url: '/desktop.bundles/' + page + '/_' + page + '.' + data.language + '.js' },
                    { elem: 'favicon', url: '//yastatic.net/lego/_/pDu9OWAQKB0s2J9IojKpiS_Eho.ico' },
                    { elem: 'meta', attrs: { name: 'description', content: '' } },
                    { elem: 'meta', attrs: { name: 'keywords', content: '' } },
                    { elem: 'meta', attrs: { property: 'og:title', content: '' } },
                    { elem: 'meta', attrs: { property: 'og:description', content: '' } },
                    { elem: 'meta', attrs: { property: 'og:image', content: '' } },
                    { elem: 'meta', attrs: { property: 'og:type', content: 'website' } }
                ],
                'x-ua-compatible': 'IE=EmulateIE7, IE=edge',

                content: 'текст'
            }
        ];
    });
};