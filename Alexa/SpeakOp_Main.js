'use strict';
const Alexa = require('alexa-sdk');
var GetServiceStatus = require('./GetServiceStatus.js')

const APP_ID = undefined;

const SKILL_NAME = 'Speak Op';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_REPROMPT = 'What would you like to do?';
const STOP_MESSAGE = 'Goodbye!';
const OPTIONS = ['Get Service status of a service', 'Trigger daily routine', 'Change view']
const HELP_MESSAGE = 'You can ask for: ' + OPTIONS;

const handlers = {
    'LaunchRequest': function () {
        // TODO: Friendly welcome message
    },
    'GetServiceStatus': function () {
        console.log(GetServiceStatus.GetStatus());
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};