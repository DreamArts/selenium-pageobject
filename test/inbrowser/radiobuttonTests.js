"use strict"

var chai = require('chai'), expect = chai.expect,
    wd = require('selenium-webdriver'), By = wd.By,
    elements = require('selenium-pageobject').elements;

describe("RadioButton", function() {
    var driver;
    var url = 'file://' + __dirname + '\\elements.html';

    before(function() {
        driver = new wd.Builder().withCapabilities(wd.Capabilities.chrome()).build();
    });

    beforeEach(function() {
        driver.get(url);
    });

    it("should return false when unchecked", function(done) {
        var rb = new elements.RadioButton(driver, By.id('radiobutton_unselected'));
        
        rb.getSelected().then(function (isSelected) {
            expect(isSelected).to.be.false;
            done();
        });
    });

    it("should return true when checked", function(done) {
        var rb = new elements.RadioButton(driver, By.id('radiobutton_selected'));

        rb.getSelected().then(function (isSelected) {
            expect(isSelected).to.be.true;
            done();
        });
    });

    it("should be able to select the radiobutton", function(done) {
        var rb = new elements.RadioButton(driver, By.id('radiobutton_unselected'));
        rb.select();

        rb.getSelected().then(function (isSelected) {
            expect(isSelected).to.be.true;
            done();
        });
    });

    after(function(done) {
        driver.quit().then(done);
    });
});