"use strict";

var extend = require('../extend.js'),
    Element = require('./element.js'),
    SelectBase = require('./selectbase.js');

module.exports = (function (_super, base) {

    extend(MultiSelectList, _super);
    
    function MultiSelectList() {
        _super.apply(this, arguments);
        var args = [null].concat(Array.prototype.slice.call(arguments, 0));
        this._base = new (Function.prototype.bind.apply(SelectBase, args));
    }

    MultiSelectList.prototype.getOptions = function() {
        return this._base.getOptions();
    };

    MultiSelectList.prototype.unselectAll = function() {
        return this._base.getSelectedOptions().then(function (options) {
            options.forEach(function (option) {
                option.click();
            })
        });
    };

    MultiSelectList.prototype.selectByIndex = function(index) {
        return this._base.selectByIndex(index);
    };

    MultiSelectList.prototype.selectByValue = function(value) {
        return this._base.selectByValue(value);
    };

    MultiSelectList.prototype.getSelectedOptions = function() {
        return this._base.getSelectedOptions();
    };

    MultiSelectList.prototype.getSelectedValues = function() {
        return this._base.getSelectedValues();
    };

    return MultiSelectList;
})(Element, SelectBase);