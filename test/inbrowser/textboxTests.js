"use strict"

var chai = require('chai'), expect = chai.expect,
    wd = require('selenium-webdriver'), By = wd.By,
    elements = require('selenium-pageobject').elements;

describe("TextBox", function() {
    var driver;
    var url = 'file://' + __dirname + '\\elements.html';

    before(function() {
        driver = new wd.Builder().withCapabilities(wd.Capabilities.chrome()).build();
    });

    beforeEach(function() {
        driver.get(url);
    });

    it("should get no text", function(done) {
        var tb = new elements.TextBox(driver, By.id('textbox_empty'));
        
        tb.getValue().then(function (text) {
            expect(text).to.be.empty;
            done();
        });
    });

    it("should get the text", function(done) {
        var tb = new elements.TextBox(driver, By.id('textbox_with_value'));
        
        tb.getValue().then(function (text) {
            expect(text).to.be.equal('pageobject');
            done();
        });
    });

    it("should set the text", function(done) {
        var expected = 'wow, much automation, such ease';
        var tb = new elements.TextBox(driver, By.id('textbox_empty'));
        tb.setValue(expected);

        tb.getValue().then(function (text) {
            expect(text).to.be.equal(expected);
            done();
        });
    });

    it("should clear the text", function(done) {
        var tb = new elements.TextBox(driver, By.id('textbox_with_value'));
        tb.clear();

        tb.getValue().then(function (text) {
            expect(text).to.be.empty;
            done();
        });
    });

    after(function(done) {
        driver.quit().then(done);
    });
});