"use strict";

var ElementFactory = require('./elementfactory.js'),
    wd = require('selenium-webdriver');

function Element(driver, locator) {
    this._element;
    this.locator = locator;
    this.driver = driver;
    this.ef = new ElementFactory(driver);
}

Object.defineProperties(Element.prototype, {
    'element' : { get : function() { return this._element ? this._element : this._element = this.driver.findElement(this.locator); }, enumerable : true, configurable : false }
});

Element.prototype.click = function() {
    return this.element.click();
};

Element.prototype.isDisplayed = function() {
    return this.element.isDisplayed();
};

Element.prototype.isSelected = function() {
    return this.element.isSelected();
};

Element.prototype.clear = function() {
    return this.element.clear();
};

Element.prototype.getText = function() {
    return this.element.getText();
};

Element.prototype.isElementPresent = function() {
    return this.driver.isElementPresent(this.locator);
};

Element.prototype.waitFor = function(timeout, msg) {
    timeout = timeout || 1000;

    return this.driver.wait(function() {
        return this.isElementPresent();
    }.bind(this), timeout, msg).then(function() {
        return this.driver.wait(function() {
            return this.isDisplayed();
        }.bind(this), timeout, msg);
    }.bind(this));
};

module.exports = Element;