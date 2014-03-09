"use strict"

var chai = require('chai'), expect = chai.expect,
    wd = require('selenium-webdriver'), By = wd.By,
    elements = require('selenium-pageobject').elements;

describe("MultiSelectList", function() {
    
    var driver;
    var url = 'file://' + __dirname + '\\elements.html';

    before(function() {
        driver = new wd.Builder().withCapabilities(wd.Capabilities.chrome()).build();
    });

    beforeEach(function() {
        driver.get(url);
    });

    it("should return the option", function(done) {
        var el = new elements.MultiSelectList(driver, By.id('multiselectList_none_selected'));
        el.getOptions().then(function (options) {
            expect(options.length).to.equal(6);
            done();
        });
    });

    it("should return no option", function (done) {
        var el = new elements.MultiSelectList(driver, By.id('multiselectList_none_selected'));
        el.getSelectedOptions().then(function (options) {
            expect(options.length).to.equal(0);
            done();
        });
    });

    it("should return one selected option", function (done) {
        var el = new elements.MultiSelectList(driver, By.id('multiselectList_one_selected'));
        el.getSelectedOptions().then(function (options) {
            expect(options.length).to.equal(1);
            options[0].getText().then(function (text) {
                expect(text).to.equal('Gibraltar');
                done(); 
            });
        });
    });

    it("should return many selected options", function (done) {
        var el = new elements.MultiSelectList(driver, By.id('multiselectList_three_selected'));
        el.getSelectedOptions().then(function (options) {
            expect(options.length).to.equal(3);
            done();
        });
    });

    it("should select an option by value", function(done) {
        var el = new elements.MultiSelectList(driver, By.id('multiselectList_none_selected'));
        el.selectByValue('BCN');

        el.getSelectedOptions().then(function (options) {
            expect(options.length).to.equal(1);
            options[0].getText().then(function (text) {
                expect(text).to.equal('Barcelona');
                done(); 
            });
        });
    });

    it("it should unselect an option by value", function(done) {
        var el = new elements.MultiSelectList(driver, By.id('multiselectList_one_selected'));
        el.selectByValue('GIB');

        el.getSelectedOptions().then(function (options) {
            expect(options.length).to.equal(0);
            done();
        });
    });

    it("should append options to the selection", function(done) {
        var el = new elements.MultiSelectList(driver, By.id('multiselectList_one_selected'));
        el.selectByValue('BCN');

        el.getSelectedOptions().then(function (options) {
            expect(options.length).to.equal(2);
            done(); 
        });
    });

    it("should select an option by index", function(done) {
        var el = new elements.MultiSelectList(driver, By.id('multiselectList_none_selected'));
        el.selectByIndex(1);

        el.getSelectedOptions().then(function (options) {
            expect(options.length).to.equal(1);
            options[0].getText().then(function (text) {
                expect(text).to.equal('Barcelona');
                done(); 
            });
        });
    });

    it("should unselect an option by index", function(done) {
        var el = new elements.MultiSelectList(driver, By.id('multiselectList_one_selected'));
        el.selectByIndex(2);

        el.getSelectedOptions().then(function (options) {
            expect(options.length).to.equal(0);
            done();
        });
    });

    it("should get one selected value", function(done) {
        var el = new elements.MultiSelectList(driver, By.id('multiselectList_one_selected'));

        el.getSelectedValues().then(function (values) {
            expect(values.length).to.equal(1);
            expect(values[0]).to.equal('GIB');
            done();
        });
    });

    it("should get many selected values", function(done) {
        var el = new elements.MultiSelectList(driver, By.id('multiselectList_three_selected'));

        el.getSelectedValues().then(function (values) {
            expect(values.length).to.equal(3);
            expect(values[0]).to.equal('AMS');
            expect(values[1]).to.equal('GIB');
            expect(values[2]).to.equal('VRN');
            done();
        });
    });

    it("should get the text for an option that has no value", function(done) {
        var el = new elements.MultiSelectList(driver, By.id('multiselectList_noValue_selected'));

        el.getSelectedValues().then(function (values) {
            expect(values.length).to.equal(1);
            expect(values[0]).to.equal('Madrid');
            done();
        });
    });

    it("should deselect all options", function(done) {
        var el = new elements.MultiSelectList(driver, By.id('multiselectList_three_selected'));
        el.unselectAll();

        el.getSelectedOptions().then(function (options) {
            expect(options.length).to.equal(0);
            done();
        });
    });

    after(function(done) {
        driver.quit().then(done);
    });
});