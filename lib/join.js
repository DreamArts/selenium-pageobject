"use strict";

var wd = require('selenium-webdriver');

function join(array, action) {
    var arr = [];
    array.forEach(function (item) {
        var d = wd.promise.defer();
        action(item, d);
        arr.push(d.promise);
    });
    return wd.promise.all(arr);
}

module.exports = join;