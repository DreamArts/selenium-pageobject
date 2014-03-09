"use strict"

var chai = require('chai'), expect = chai.expect,
    wd = require('selenium-webdriver'), By = wd.By,
    elements = require('selenium-pageobject').elements;

describe("Checkbox", function() {
    var driver;
    var url = 'file://' + __dirname + '\\elements.html';

    before(function() {
        driver = new wd.Builder().withCapabilities(wd.Capabilities.chrome()).build();
    });

    beforeEach(function() {
        driver.get(url);
    });

    it("should return false when unchecked", function(done) {
        var cb = new elements.CheckBox(driver, By.id('checkbox_unchecked'));
        cb.getChecked().then(function (isChecked) {
            expect(isChecked).to.be.false;
            done();
        });
    });

    it("should return true when checked", function(done) {
        var cb = new elements.CheckBox(driver, By.id('checkbox_checked'));
        cb.getChecked().then(function (isChecked) {
            expect(isChecked).to.be.true;
            done();
        });
    });

    it("should be able to check the checkbox", function(done) {
        var cb = new elements.CheckBox(driver, By.id('checkbox_unchecked'));
        cb.setChecked(true);

        cb.getChecked().then(function (isChecked) {
            expect(isChecked).to.be.true;
            done();
        });
    });

    it("should be able to uncheck the checkbox", function(done) {
        var cb = new elements.CheckBox(driver, By.id('checkbox_checked'));
        cb.setChecked(false);

        cb.getChecked().then(function (isChecked) {
            expect(isChecked).to.be.false;
            done();
        });
    });

    it("should not change the state when already checked", function(done) {
        var cb = new elements.CheckBox(driver, By.id('checkbox_checked'));
        cb.setChecked(true);

        cb.getChecked().then(function (isChecked) {
            expect(isChecked).to.be.true;
            done();
        });
    });

    it("should not change the state when already unchecked", function(done) {
        var cb = new elements.CheckBox(driver, By.id('checkbox_unchecked'));
        cb.setChecked(false);

        cb.getChecked().then(function (isChecked) {
            expect(isChecked).to.be.false;
            done();
        });
    });

    after(function(done) {
        driver.quit().then(done);
    });
});