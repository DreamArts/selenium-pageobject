"use strict";

var extend = require('../extend.js'),
    Element = require('./element.js');

module.exports = (function (_super) {
    "use strict";
    extend(CheckBox, _super);
    
    function CheckBox() {
        _super.apply(this, arguments);
    }

    CheckBox.prototype.getChecked = function() {
        return this.element.isSelected();
    };

    CheckBox.prototype.setChecked = function(value) {
        value = value || false;
        return this.element.isSelected().then(function (isSelected) {
            if (isSelected !== value) { this.click(); } 
        }.bind(this));
    };

    return CheckBox;
})(Element);