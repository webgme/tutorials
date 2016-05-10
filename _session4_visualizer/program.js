
var FSM = {};

/**
 * @param {function(string)} log - Out put goes here, e.g. console.log.
 */
FSM.Simulator = function (log) {
    'use strict';
    var finalStates = [],
        self = this;

    this.currentState = 'Initial';
    this.currentStateId = '/a/I/v';
    this.possibleEvents = [];
    this.atEnd = false;

    finalStates.push('/a/I/X');

    this.initialize = function () {
        self.currentState = 'Initial';
        self.currentStateId = '/a/I/v';
        self.possibleEvents = [];
        self.atEnd = false;
        self.enterEvent();
    };

    this.enterEvent = function (currentInput) {
        if (self.currentStateId === "/a/I/l") {
            if (currentInput === 'end') {
                log('Switching state to End (/a/I/X)');
                self.currentStateId = '/a/I/X';
                self.currentState = 'End';
                self.enterEvent();
            } else {
                self.possibleEvents = ["end"];
                log('Possible events for transition(s): "end"');
            }
        } else if (self.currentStateId === "/a/I/v") {
            if (currentInput === 'start') {
                log('Switching state to State (/a/I/Z)');
                self.currentStateId = '/a/I/Z';
                self.currentState = 'State';
                self.enterEvent();
            } else if (currentInput === 'start1') {
                log('Switching state to State1 (/a/I/l)');
                self.currentStateId = '/a/I/l';
                self.currentState = 'State1';
                self.enterEvent();
            } else {
                self.possibleEvents = ["start", "start1"];
                log('Possible events for transition(s): "start", "start1"');
            }
        } else if (self.currentStateId === "/a/I/Z") {
            if (currentInput === 'end') {
                log('Switching state to End (/a/I/X)');
                self.currentStateId = '/a/I/X';
                self.currentState = 'End';
                self.enterEvent();
            } else if (currentInput === 's1') {
                log('Switching state to State1 (/a/I/l)');
                self.currentStateId = '/a/I/l';
                self.currentState = 'State1';
                self.enterEvent();
            } else {
                self.possibleEvents = ["end", "s1"];
                log('Possible events for transition(s): "end", "s1"');
            }
        }

        if (currentInput === 'exit') {
            self.atEnd = true;
        } else if (finalStates.indexOf(currentStateId) !== -1) {
            log('At a final state ' + currentState + '(' + currentStateId + ')');
            self.atEnd = true;
        }
    };

    this.getPossibleEvents = function () {
        return self.possibleEvents;
    };

    this.getCurrentState = function () {
        return {
            id: self.currentStateId,
            name: self.currentState
        };
    };
}
