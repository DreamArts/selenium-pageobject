"use strict";

var extend = require('../extend.js'),
    Element = require('./element.js'),
    SelectBase = require('./selectbase.js'),
    wd = require('selenium-webdriver');

module.exports = (function (_super, base) {
    extend(SelectList, _super);
    
    function SelectList() {
        _super.apply(this, arguments);
        var args = [null].concat(Array.prototype.slice.call(arguments, 0));
        this._base = new (Function.prototype.bind.apply(SelectBase, args));
    }

    SelectList.prototype.getOptions = function() {
        return this._base.getOptions();
    };

    SelectList.prototype.getSelectedOption = function() {
        var d = wd.promise.defer();

        this._base.getSelectedOptions().then(function (options) {
            if (!options.length) {
                d.reject(new Error('getSelectedOption: There is no selected option'));
                return;
            }

            d.fulfill(options[0]);
        });

        return d.promise;
    };

    SelectList.prototype.getSelectedValue = function() {
        var d = wd.promise.defer();
        
        this.getSelectedOption().then(function (option) {
            option.getAttribute('value').then(function (value) {
                d.fulfill(value);
            });
        });

        return d.promise;
    };

    SelectList.prototype.getFirstSelectedText = function() {
        var d = wd.promise.defer();
        
        this.getSelectedOption().then(function (option) {
            option.getText().then(function (value) {
                d.fulfill(value);   
            });
        });

        return d.promise;
    };

    SelectList.prototype.selectByIndex = function(index) {
        return this._base.selectByIndex(index);
    };

    SelectList.prototype.selectByValue = function(value) {
        return this._base.selectByValue(value);
    };

    return SelectList;
})(Element, SelectBase);