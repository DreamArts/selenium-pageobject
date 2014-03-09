"use strict";

var extend = require('../extend.js'),
    Element = require('./element.js');

module.exports = (function (_super) {
    extend(TextBox, _super);
    
    function TextBox() {
        _super.apply(this, arguments);
    }

    TextBox.prototype.getValue = function() {
        return this.element.getAttribute('value');
    };

    TextBox.prototype.setValue = function(value) {
        this.element.clear();
        this.element.sendKeys(value);
    };

    TextBox.prototype.tabOut = function() {
        return this.element.sendKeys('\t');
    };

    return TextBox;
})(Element);