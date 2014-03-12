"use strict";

var wd = require('selenium-webdriver'),
    _ = require('underscore')
    _.str = require('underscore.string'),
    _.mixin(_.str.exports());

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

function halt() {
    throw new Error('halt');
}

function Workflow() {
    this.steps = [];
    this._callbacks = [];
}

Workflow.prototype._execCallbacks = function(promise, id, pageObject) {
    var callbacks = _.filter(this._callbacks, function(item) { return item.id === id; });
    
    for (var index = 0; index < callbacks.length; index++) {
        var item = callbacks[index];
        promise = promise.then(function () { return item.action.call(this, pageObject); }.bind(this));
    }

    return promise;
};

Workflow.prototype._getCallbacks = function(id, pageObject) {
    var callbacks = _.filter(this._callbacks, function(item) { return item.id === id; });
    return _.map(callbacks, function (item) { return { action : item.action, pageObject: pageObject, for: id }; });
};

Workflow.prototype.run = function(from, to) {
    var pageObject, steps = [],
        startIndex = indexOfIdOr(this.steps, from, 0),
        endIndex = indexOfIdOr(this.steps, to, this.steps.length-1),
        sourceSteps = this.steps.slice(startIndex, endIndex+1);

    _.each(sourceSteps, function (step) {
        var args = this._getCallbacks(step.id, step.pageObject);
        args.splice(0, 0, steps.length, 0);
        Array.prototype.splice.apply(steps, args);
        steps.push(step);
    }.bind(this));

    _.each(steps, function (step) {
        if (!step.pageObject && pageObject) {
            step.pageObject = pageObject;
        }
        pageObject = step.pageObject || pageObject;
    });

    var flow = wd.promise.controlFlow();
    var promises = _.map(steps, function (step) {
        return flow.execute(function () { step.action.call(this, step.pageObject, halt); }.bind(this));
    }.bind(this));

    return wd.promise.all(promises).then(null, function (err) {
        if (err.message && _.str.include(err.message, 'halt')) {
            return;
        }

        throw err;
    });
};

Workflow.prototype.on = function(id, action) {
    this._callbacks.push({ id : id, action : action });
}

module.exports = Workflow;