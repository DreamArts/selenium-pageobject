"use strict"

var chai = require('chai'), expect = chai.expect,
    wd = require('selenium-webdriver'), By = wd.By,
    elements = require('selenium-pageobject').elements;

describe("Element", function() {
    
    var driver;
    var url = 'file://' + __dirname + '\\elements.html';

    before(function() {
        driver = new wd.Builder().withCapabilities(wd.Capabilities.chrome()).build();
    });

    beforeEach(function() {
        driver.get(url);
    });

    it("should timeout waiting for the element", function(done) {
        var el = new elements.MultiSelectList(driver, By.id('link'));

        el.waitFor(10).then(function () {
            throw new Error('waitFor did not time out when it should have');
        }).then(null, function (err) {
            expect(err).to.not.be.undefined;
            done();
        });
    });

    it("should not timeout waiting for the element", function(done) {
        var el = new elements.MultiSelectList(driver, By.id('link'));

        el.waitFor(5000).then(function () {
            done();
        });
    });

    it("should not find a non-existent element", function(done) {
        var el = new elements.MultiSelectList(driver, By.id('does_not_exist'));

        el.isElementPresent().then(function (present) {
            expect(present).to.be.false;
            done();
        });
    });

    it("should find an element that exists", function(done) {
        var el = new elements.MultiSelectList(driver, By.id('exists'));

        el.isElementPresent().then(function (present) {
            expect(present).to.be.true;
            done();
        });
    });

    after(function(done) {
        driver.quit().then(done);
    });
});