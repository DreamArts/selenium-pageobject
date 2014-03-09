"use strict";

var extend = require('../extend.js'),
    join = require('../join.js'),
    Element = require('./element.js'),
    wd = require('selenium-webdriver'), By = wd.By,
    _ = require('underscore');

module.exports = (function (_super) {
    extend(SelectBase, _super);
    
    function SelectBase() {
        _super.apply(this, arguments);
    }

    SelectBase.prototype.getOptions = function() {
        return this.element.findElements(By.tagName('option'));
    };

    SelectBase.prototype.getSelectedOptions = function() {
        return this.getOptions().then(function (options) {
            return join(options, function (option, d) {
                option.isSelected().then(function (isSelected) {
                    d.fulfill(isSelected ? option : undefined);
                });
            });
        }).then(function (options) {
            var f = _.filter(options, function (option) { return option !== undefined; });
            return wd.promise.fulfilled(f);
        });
    };

    SelectBase.prototype.getSelectedValues = function() {
        return this.getSelectedOptions().then(function (options) {
            return join(options, function (option, d) {
                option.getAttribute('value').then(function (value) {
                    d.fulfill(value);
                });
            });
        });
    };

    SelectBase.prototype.selectByValue = function (value) {
        return this.element
                .findElements(By.css("option[value='" + value + "']"))
                .then(function (options) {
                    options.forEach(function (item) {
                        item.click();
                    });
                });
    };

    SelectBase.prototype.selectByIndex = function(index) {
        return this.getOptions().then(function (options) {
            if (index < 0 || index >= options.length) {
                throw new Error('selectByIndex: index out of range. Array length: ' + options.length + ', specified index: ' + index);
            }
            options[index].click();
        });
    };
    
    return SelectBase;
})(Element);