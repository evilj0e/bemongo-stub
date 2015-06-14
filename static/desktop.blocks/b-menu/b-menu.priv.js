module.exports = function (blocks) {
    blocks.declare('b-menu', function (data) {
        return [
            {
                block: 'b-menu',
                content: (function() {
                    return [
                        data.menu.main.map(function (item) {
                            return item && {
                                elem: 'item',
                                content: {
                                    block: 'b-link',
                                    mods: data.route.path === item.url ? { 'active': 'true' } : {},
                                    content: item.title,
                                    url: item.url
                                }
                            };
                        }),
                        data.menu.additional[data.contentType] && data.menu.additional[data.contentType].map(function (item) {
                            return item && {
                                    elem: 'item',
                                    content: {
                                        block: 'b-link',
                                        mods: data.route.path === item.url ? { 'active': 'true' } : {},
                                        content: item.title,
                                        url: item.url
                                    }
                                };
                        })
                    ];
                })()
            }
        ];
    });
};