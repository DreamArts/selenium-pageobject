# selenium-pageobject

A lightweight pageobject library for use with [webdriverjs](https://code.google.com/p/selenium/wiki/WebDriverJs).

Read about pageobjects at [Martin Fowler's bliki](http://martinfowler.com/bliki/PageObject.html) and [Selenium's wiki](https://code.google.com/p/selenium/wiki/PageObjects).

## Installation

    npm install selenium-pageobject

## Getting started

The primary classes are:
* `PageNavigator`
* everything in the elements directory

The `PageNavigator` provides methods to visit pages etc. The `Element` and its derived classes are wrappers to elements on the web page.

You can directly use the elements to access things on the page like this:
````javascript
var wd = require('selenium-webdriver'),
    elements = require('selenium-pageobject').elements;
    
var driver = new wd.Builder().withCapabilities(wd.Capabilities.chrome()).build(),
    pageNavigator = new PageNavigator({ driver: driver });

pageNavigator.visit('http://www.example.com');
var cb = new elements.CheckBox(driver, By.id('checkboxId'));
cb.getChecked().then(function (isChecked) {
    /* do something with isChecked */
});

````

## PageObjects (WIP)

There's no actual class that represents a PageObject, since these are the things you write to drive your site. So let's run through a quick example of what one might look like.

Start with modelling your UI, so `mypagemodel.js`:
````javascript
var By = require('selenium-webdriver').By,
    po = require('selenium-pageobject'), extend = po.extend, Element = po.elements.Element;

module.exports = (function (_super) {
    extend(MyPageModel, _super);

    function MyPageModel() {
    	_super.apply(this, arguments);

    	this.username = this.ef.textbox(By.id('username'));
        this.password = this.ef.textbox(By.id('password'));
        this.loginButton = this.ef.element(By.id('login'));
    }

    return MyPageModel;
})(Element);
````

Now create your PageObject in `mypage.js`:
````javascript
var By = require('selenium-webdriver').By,
    MyPageModel = require('./mypagemodel.js');

function MyPage(driver) {
    this._ui = new MyPageModel(driver, By.tagName('html'));
}

MyPage.prototype.login = function (username, password) {
    this._ui.username.setValue(username);
    this._ui.password.setValue(password);
    return this._ui.loginButton.click();
};

module.exports = MyPage;
````

Now write your test in `mypageTests.js`:
````javascript
var chai = require('chai'), expect = chai.expect,
    wd = require('selenium-webdriver'), By = wd.By,
    PageNavigator = require('selenium-pageobject').PageNavigator,
    MyPage = require('./mypage.js');

describe("MyPage", function() {
    var driver;
    var url = 'file://' + __dirname + '\\mypage.html';

    before(function() {
        driver = new wd.Builder().withCapabilities(wd.Capabilities.chrome()).build();
    });

    beforeEach(function() {
        driver.get(url);
    });

	it("can login", function(done) {
        var pageNavigator = new PageNavigator({ driver: driver });
        var myPage = new MyPage(driver);

        pageNavigator.visit(url).then(function () {
            myPage.login('JohnSmith', 'password').then(function () {
                // expect something
            });
        }).then(function () {
            done();
        }).then(null, function (err) {
            done(err);
        });
    });

    after(function(done) {
        driver.quit().then(done);
    });
});
````

## Workflows
*This is an experimental feature at the moment and may not make it into the final version*

A `Workflow` allows you to define a set of steps which it will then run through, you can define callbacks that occur on specific steps of the workflow.
