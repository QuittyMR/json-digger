var utils = require('./helpers.js');
var _ = require('lodash');

function getDiff(before, after, path, delta) {
    var beforeType = utils.type(before);
    var afterType = utils.type(after);
    path = path || 'root';
    delta = delta || {};

    if (typeof after === 'undefined') {
        delta[path] = 'Removed';
    }
    else if (beforeType !== afterType) {
        delta[path] = [
            'Type changed:',
            (before || 'null').toPrintable() + '(' + beforeType + ')',
            '->',
            (after || 'null').toPrintable() + '(' + afterType + ')'
        ].join(' ');
    }

    else if (utils.hash(before) === utils.hash(after)) { // noinspection UnnecessaryReturnStatementJS
        return;
    }

    else if (_.isPlainObject(before)) {
        _.toPairs(before).forEach(function (item) {
            getDiff(item[1], after[item[0]], [path, item[0]].join('.'), delta)
        });

        _.toPairs(after).filter(function (item) {
            return !(item[0] in before)
        }).forEach(function (item) {
            delta[[path, item[0]].join('.')] = "Added: " + item[1].toPrintable();
        });
    }

    else if (_.isArray(before)) {
        // Convert to map, test differences recursively
        return getDiff(utils.arrayToMap(before), utils.arrayToMap(after), path, delta);
    }

    else if (before !== after) {
        delta[path] = before + ' -> ' + after;
    }

    return delta;
}

module.exports.get = function (before, after) {
    var delta = getDiff(before, after);
    if (process.env.debug) {
        console.log(delta);
    }
    return delta;
};