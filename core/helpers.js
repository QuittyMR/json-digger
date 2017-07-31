var _ = require('lodash');
var objectHash = require('object-hash');

Object.prototype.toPrintable = function () {
    if (_.isArray(this)) {
        return this.map(extractObjectData);
    }
    else {
        return extractObjectData(this);
    }
};

String.prototype.toPrintable = function () {
    return this.toString();
};

Number.prototype.toPrintable = function () {
    return this.toString();
};

function getHash(item) {
    return objectHash(item);
}

function getTypeString(item) {
    return Object.prototype.toString.call(item).replace('[object ', '').replace(']', '');
}

function extractObjectData(item) {
    if (_.isPlainObject(item)) {
        if ('id' in item || 'name' in item || '_id' in item) {
            return ['Block: ', item.name || '', '(' + (item.id || item._id || '') + ')'].join(' ');
        }
        else {
            return JSON.stringify(item);
        }
    }
    else return item;
}

function getIdentifier(item) {
    var objectKeys = _.toPairs(item).filter(function (objectKey) {
        return ['name', 'id', '_id', 'key'].includes(objectKey[0].toLowerCase())
    }).map(function (item) {
        return item[1];
    }).join('::');
    return '(' + objectKeys + ')' || getHash(item);
}

function arrayToMap(item) {
    var generatedMap = {};
    item.forEach(function (item) {
        var itemId;
        if (_.isObjectLike(item)) {
            itemId = getIdentifier(item);
        }
        else {
            itemId = item;
        }
        generatedMap[itemId] = item;
    });
    return generatedMap;
}

module.exports.hash = getHash;
module.exports.type = getTypeString;
module.exports.arrayToMap = arrayToMap;
