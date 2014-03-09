"use strict";

var extend = require('../extend.js'),
    Element = require('./element.js');

module.exports = (function(_super) {
    extend(RadioButton, _super);

    function RadioButton() {
        _super.apply(this, arguments);
    }

    RadioButton.prototype.getSelected = function() {
        return this.element.isSelected();
    };

    RadioButton.prototype.select = function() {
        return this.element.isSelected().then(function (isSelected) {
            if (!isSelected) {
                this.click(); 
            }
        }.bind(this));
    };  

    return RadioButton;
})(Element);