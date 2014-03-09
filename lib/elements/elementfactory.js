"use strict";

var elements = require('../elements');

function ElementFactory(driver) {
    if (!driver) {
        throw Error('The driver must be specified for the ElementFactory to work'); 
    }
    this.driver = driver;
}

ElementFactory.prototype.element = function(locator) {
    return new elements.Element(this.driver, locator);
};

ElementFactory.prototype.checkbox = function(locator) {
    return new elements.CheckBox(this.driver, locator);
}

ElementFactory.prototype.textbox = function(locator) {
    return new elements.TextBox(this.driver, locator);
}

ElementFactory.prototype.radiobutton = function(locator) {
    return new elements.RadioButton(this.driver, locator);
}

ElementFactory.prototype.selectlist = function(locator) {
    return new elements.SelectList(this.driver, locator);
}

ElementFactory.prototype.multiselectlist = function(locator) {
    return new elements.MultiSelectList(this.driver, locator);
}

module.exports = ElementFactory;