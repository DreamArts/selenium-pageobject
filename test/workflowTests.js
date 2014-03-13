"use strict";

var chai = require('chai'), expect = chai.expect,
    Workflow = require('selenium-pageobject').Workflow;

describe("Workflow", function() {

    it("should run a single step", function(done) {
        var wf = new Workflow();
        var count = 0;
        
        wf.steps.push({ action: function () { count++; } });
        
        wf.run().then(function () {
            expect(count).to.equal(1);
            done();
        });
    });

    it("should run multiple steps", function(done) {
        var wf = new Workflow();
        var count = 0;
        
        wf.steps.push({ action: function () { count++; } });
        wf.steps.push({ action: function () { count++; } });
        
        wf.run().then(function () {
            expect(count).to.equal(2);
            done();
        });
    });

    it("should pass the pageObject to the action", function(done) {
        var wf = new Workflow();
        var expected = new Object();
        var actual;

        wf.steps.push({ pageObject: expected, action: function (po) { actual = po; } });
        
        wf.run().then(function () {
            expect(expected).to.equal(actual);
            done();
        });
    });

    it("should pass the 'current' pageObject to the action", function(done) {
        var wf = new Workflow();
        var expected = new Object();
        var actual;

        wf.steps.push({ pageObject: expected, action: function () { } });
        wf.steps.push({ action: function (po) { actual = po; } });
        
        wf.run().then(function () {
            expect(expected).to.equal(actual);
            done();
        });
    });

    it("should execute actions in the workflow scope", function(done) {
        var wf = new Workflow();
        var actual;

        wf.steps.push({ action: function () { actual = this; } });
        
        wf.run().then(function () {
            expect(wf).to.equal(actual);
            done();
        });
    });

    it("should execute a callback on the specified step", function(done) {
        var wf = new Workflow();
        var count = 0;

        wf.steps.push({ id: '1', action: function () { count++; } });
        wf.steps.push({ id: '2', action: function () { count++; } });
        wf.steps.push({ id: '3', action: function () { count++; } });
        
        wf.on('3', function() {
            expect(count).to.equal(2);
            done();
        });

        wf.run();
    });

    it("should execute multiple callbacks in the order they were registered", function(done) {
        var wf = new Workflow();
        var count = 0;

        wf.steps.push({ id: '1', action: function () { expect(count).to.equal(2); done(); } });
        
        wf.on('1', function() {
            expect(count).to.equal(0);
            count++;
        });

        wf.on('1', function() {
            expect(count).to.equal(1);
            count++;
        });

        wf.run();
    });

    it("should pass the pageObject to the callback action", function(done) {
        var wf = new Workflow();
        var expected = new Object();
        var actual;

        wf.steps.push({ id: '1', pageObject: expected, action: function () { } });

        wf.on('1', function(po) {
            actual = po;
        });
        
        wf.run().then(function () {
            expect(expected).to.equal(actual);
            done();
        });
    });

    it("should pass the 'current' pageObject to the callback action", function(done) {
        var wf = new Workflow();
        var expected = new Object();
        var actual;

        wf.steps.push({ id: '1', pageObject: expected, action: function () { } });
        wf.steps.push({ id: '2', action: function () { } });

        wf.on('2', function(po) {
            actual = po;
        });
        
        wf.run().then(function () {
            expect(expected).to.equal(actual);
            done();
        });
    });

    it("should execute callback actions in the workflow scope", function(done) {
        var wf = new Workflow();
        var actual;

        wf.steps.push({ id: '1', action: function () { } });

        wf.on('1', function(po) {
            actual = this;
        });
        
        wf.run().then(function () {
            expect(wf).to.equal(actual);
            done();
        });
    });

    it("should not execute further steps after a callback halts the workflow", function(done) {
        var wf = new Workflow();
        var count = 0;

        wf.steps.push({ id: '1', action: function () { count++; } });
        wf.steps.push({ id: '2', action: function () { count++; } });
        
        wf.on('2', function(po) {
            return this.stopWorkflow();
        });

        wf.run().then(function () {
            expect(count).to.equal(1);
            done();
        });
    });


    it("should run from the specified step", function(done) {
        var wf = new Workflow();
        var step1 = false, step2 = false;

        wf.steps.push({ id: '1', action: function () { step1 = true; } });
        wf.steps.push({ id: '2', action: function () { step2 = true; } });
        
        wf.run('2').then(function () {
            expect(step1).to.equal(false);
            expect(step2).to.equal(true);
            done();
        });
    });

    it("should run to the specified step", function(done) {
        var wf = new Workflow();
        var step1 = false, step2 = false, step3 = false;

        wf.steps.push({ id: '1', action: function () { step1 = true; } });
        wf.steps.push({ id: '2', action: function () { step2 = true; } });
        wf.steps.push({ id: '3', action: function () { step3 = true; } });
        
        wf.run('1', '2').then(function () {
            expect(step1).to.equal(true);
            expect(step2).to.equal(true);
            expect(step3).to.equal(false);
            done();
        });
    });

    it("should run callbacks before actions", function(done) {
        var wf = new Workflow();

        wf.steps.push({ id: '1', action: function () { throw new Error('Should not execute'); } });
        wf.on('1', function (po) { return this.haltWorkflow(); });

        wf.run().then(function () { done(); });
    });

});