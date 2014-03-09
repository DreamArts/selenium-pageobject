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

In the simplest, non-pageobject approach, you can do things like this:

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

## Page Objects

WIP
