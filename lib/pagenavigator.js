"use strict";

var extend = require('./extend.js'),
    el = require('./elements'),
    _ = require('underscore')
    _.str = require('underscore.string'),
    _.mixin(_.str.exports());;

function defaultWaitForAjaxStrategy() {
    return this.driver.executeScript('return jQuery ? jQuery.active : 0').then(function (count) {
        return count === 0;
    });
}

function defaultWaitForUrlStrategy(targetUrl, currentUrl) {
    return _(currentUrl.toLowerCase()).startsWith(targetUrl.toLowerCase());
}

function PageNavigator(options) {
    options = options || {};

    if (!options.driver) {
        throw new Error('The page object requires a driver');
    }

    this._waitForAjaxStrategy = (options.waitForAjaxStrategy || defaultWaitForAjaxStrategy).bind(this);
    this._waitForUrlStrategy = (options.waitForUrlStrategy || defaultWaitForUrlStrategy).bind(this);
    this.driver = options.driver;
}

PageNavigator.prototype.visit = function(url) {
    if (!url) {
        throw Error('url not specified');
    }
    
    return this.driver.get(url);
};

PageNavigator.prototype.waitForAjax = function (timeout, msg) {
    return this.driver.wait(function () {
        return this._waitForAjaxStrategy();
    }.bind(this), timeout || 1000, msg);
}

PageNavigator.prototype.waitForUrl = function (url, timeout, msg) {
    return this.driver.wait(function () {
        return this.driver.getCurrentUrl().then(function(currentUrl) {
            return this._waitForUrlStrategy(url, currentUrl);
        }.bind(this));
    }.bind(this), timeout || 5000, msg);
};

module.exports = PageNavigator;