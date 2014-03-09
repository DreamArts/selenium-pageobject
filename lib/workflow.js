"use strict";

var wd = require('selenium-webdriver'),
    _ = require('underscore');

function indexOfIdOr(items, id, value) {

    if (id === undefined) {
        return value;
    }

    var obj = _.find(items, function (item) { return item.id === id; })

    if (obj === undefined) {
        return value;
    }

    return _.indexOf(items, obj);
}

function Workflow() {
    this.steps = [];
    this._callbacks = [];
}

Workflow.prototype._execCallbacks = function(id, pageObject) {
    var callbacks = _.filter(this._callbacks, function(item) { return item.id === id; });
    
    for (var index = 0; index < callbacks.length; index++) {
        var item = callbacks[index];

        if (item.action) {
            var halt = item.action.call(this, pageObject) === true;
            if (halt) {
                return true;
            }
        } else {
            console.debug('_execCallbacks: action not specified');
        }
    }

    return false;
};

Workflow.prototype.run = function(from, to) {
    var pageObject,
        startIndex = indexOfIdOr(this.steps, from, 0),
        endIndex = indexOfIdOr(this.steps, to, this.steps.length-1);

    for (var index = startIndex; index <= endIndex; index++) {
        var step = this.steps[index];
        pageObject = step.pageObject || pageObject;

        var halt = this._execCallbacks(step.id, pageObject);
        if (halt) {
            break;
        }

        if (step.action) {
            step.action.call(this, pageObject);
        }
    }

    return wd.promise.fulfilled();
};

Workflow.prototype.on = function(id, action) {
    this._callbacks.push({ id : id, action : action });
}

module.exports = Workflow;