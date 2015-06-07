module.exports = function (blocks) {
    blocks.declare('pre', function (data, page) {
        return [
            {
                tag: 'pre',
                content: [
                    data.isAccount && JSON.stringify(data.user,  null, 2),
                    data.isGoods   && JSON.stringify(data.goods, null, 2),
                    data.isUsers   && JSON.stringify(data.users, null, 2)
                ]
            }
        ];
    });
};