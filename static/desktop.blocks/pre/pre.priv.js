module.exports = function (blocks) {
    blocks.declare('pre', function (data, page) {
        return [
            {
                tag: 'pre',
                content: data.contentType && JSON.stringify(data[data.contentType],  null, 2)
            }
        ];
    });
};