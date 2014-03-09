"use strict"

var chai = require('chai'), expect = chai.expect,
    wd = require('selenium-webdriver'),
    PageNavigator = require('selenium-pageobject').PageNavigator;

describe("PageNavigator", function() {
    var driver;
    var url = 'file:///' + __dirname + '\\elements.html';

    beforeEach(function() {
        driver = new wd.Builder().withCapabilities(wd.Capabilities.chrome()).build();
    });

    it("should require a URL to visit a page", function(done) {
        var pageNavigator = new PageNavigator({ driver: driver });
        var fn = function () { pageNavigator.visit(null); }
        expect(fn).to.throw('url not specified');
        done();
    });

    it("should visit a page", function(done) {
        var options = {
            driver: driver
        };

        var pageNavigator = new PageNavigator(options);
        pageNavigator.visit(url).then(function () {
            driver.getTitle().then(function (title) {
                expect(title).to.equal('Test page');
                done();
            });
        })
    });

    it("should wait for ajax calls to complete", function(done) {
        var options = {
            driver: driver,
            waitForAjaxStrategy: function (targetUrl, currentUrl) { return true; }
        };
        
        var pageNavigator = new PageNavigator(options);

        pageNavigator.waitForAjax(1000).then(function () {
            done();
        });
    });

    it("should timeout when ajax calls have not completed", function(done) {
        var options = {
            driver: driver,
            waitForAjaxStrategy: function (targetUrl, currentUrl) { return false; }
        };

        var msg = "My error message";
        var pageNavigator = new PageNavigator(options);

        pageNavigator.waitForAjax(500, msg).then(null, function (err) {
            expect(err).to.be.instanceof(Error);
            expect(err.message).to.contain(msg);
            done();
        });
    });

    it("should wait for url", function(done) {
        var options = {
            driver: driver,
            waitForUrlStrategy: function (targetUrl, currentUrl) { return true; }
        };
        
        var pageNavigator = new PageNavigator(options);

        pageNavigator.waitForUrl('', 1000).then(function () {
            done();
        });
    });

    it("should timeout waiting for url", function(done) {
        var options = {
            driver: driver,
            waitForUrlStrategy: function (targetUrl, currentUrl) { return false; }
        };

        var msg = "My error message";
        var pageNavigator = new PageNavigator(options);

        pageNavigator.waitForUrl('', 500, msg).then(null, function (err) {
            expect(err).to.be.instanceof(Error);
            expect(err.message).to.contain(msg);
            done();
        });
    });

    afterEach(function(done) {
        driver.quit().then(done);
    });
});