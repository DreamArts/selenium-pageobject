"use strict"

var chai = require('chai'), expect = chai.expect,
    wd = require('selenium-webdriver'), By = wd.By,
    elements = require('selenium-pageobject').elements;

describe("SelectList", function() {
    
    var driver;
    var url = 'file://' + __dirname + '\\elements.html';

    before(function() {
        driver = new wd.Builder().withCapabilities(wd.Capabilities.chrome()).build();
    });

    beforeEach(function() {
        driver.get(url);
    });

    it("should get the options", function(done) {
        var el = new elements.SelectList(driver, By.id('selectList_second_selected'));
        
        el.getOptions().then(function (options) {
            expect(options.length).to.equal(6);
            done();
        });
    });

    it("should get the selected option", function (done) {
        var el = new elements.SelectList(driver, By.id('selectList_second_selected'));
        
        el.getSelectedOption().then(function (option) {
            option.getText().then(function (text) {
                expect(text).to.equal('Barcelona');
                done();
            });
        });
    });

    it("should select an option by value", function(done) {
        var el = new elements.SelectList(driver, By.id('selectList_second_selected'));
        el.selectByValue('VRN');

        el.getSelectedOption().then(function (option) {
            option.getText().then(function (text) {
                expect(text).to.equal('Verona');
                done(); 
            });
        });
    });

    it("should select an option by index", function(done) {
        var el = new elements.SelectList(driver, By.id('selectList_second_selected'));
        el.selectByIndex(4);

        el.getSelectedOption().then(function (option) {
            option.getText().then(function (text) {
                expect(text).to.equal('Madrid');
                done(); 
            });
        });
    });

    it("should get the selected value", function(done) {
        var el = new elements.SelectList(driver, By.id('selectList_second_selected'));

        el.getSelectedValue().then(function (value) {
            expect(value).to.equal('BCN');
            done();
        });
    });

    it("should get the text for an option that has no value", function(done) {
        var el = new elements.SelectList(driver, By.id('selectList_noValue_selected'));

        el.getSelectedValue().then(function (value) {
            expect(value).to.equal('Madrid');
            done();
        });
    });

    after(function(done) {
        driver.quit().then(done);
    });
});