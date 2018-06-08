/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const Elastic = require('./Elastic.js')
const ServiceAlerts = require('./ServiceAlerts.js')

const SKILL_NAME = 'Speak Op';
const HELP_REPROMPT = 'What would you like to do?';
const STOP_MESSAGE = 'Goodbye!';
const OPTIONS = ['Get Service status of a service', 'Trigger daily routine', 'Change view']
const HELP_MESSAGE = 'You can ask for: ' + OPTIONS;

const GetServiceHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return handlerInput.requestEnvelope.request.type == 'IntentRequest' &&
        handlerInput.requestEnvelope.request.intent.name == 'GetServiceStatus';
  },
  async handle(handlerInput) {
    console.log(JSON.stringify(handlerInput.requestEnvelope.request.intent));
    console.log("GetServiceStatus");
    var service = handlerInput.requestEnvelope.request.intent.slots.service.value;//"google";
    var speech = await Elastic.GetStatusNew(service);
    return await handlerInput.responseBuilder
        .speak(speech)
        .getResponse();
  },
};

const GetStats = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type == 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name == 'GetStats';
    },
    async handle(handlerInput) {
        console.log("GetStats");
        var speech = "The load of your services are: ";
        var services = await Elastic.GetStats();
        for (var service in services) {
            speech += service + " is " + services[service] + ",";
        }
        speech += ". Ask get service status for further information";
        return await handlerInput.responseBuilder
            .speak(speech)
            .getResponse();
      },

};

const OpenDashboard = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type == 'IntentRequest' &&
          handlerInput.requestEnvelope.request.intent.name == 'OpenDashboard';
  },
  async handle(handlerInput) {
      console.log("OpenDashboard");
      var speech = "";
      var endpoint = process.env.DASHURL;
      var dash = handlerInput.requestEnvelope.request.intent.slots.dashboard.value;
      var screen = handlerInput.requestEnvelope.request.intent.slots.screen.value;
      var services = await Elastic.OpenDash(endpoint, dash, screen);
      speech += "Signal successfully sent to open dashboard: " + dash + ", on screen: " + screen;
      return await handlerInput.responseBuilder
          .speak(speech)
          .getResponse();
    },
};

const DailyStart = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type == 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name == 'DailyStart';
  },
  async handle(handlerInput) {
    console.log('DailyStart');
    var speech = 'Status: ';
    var endpoint = process.env.DASHURL;
    var res = await Elastic.DailyStart(endpoint);
    if(res)
      speech += "Successfully sent signal to trigger start"
    return await handlerInput.responseBuilder
        .speak(speech)
        .getResponse();
  }
}

const GetBadServices = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type == 'IntentRequest' &&
          handlerInput.requestEnvelope.request.intent.name == 'GetBadServices';
  },
  async handle(handlerInput) {
      console.log("GetBadServices");
      var url = process.env.SERVICEURL;
      var speech = "";
      var res = await ServiceAlerts.GetBadServices(url);
      if(res)
        speech += res;
      return await handlerInput.responseBuilder
          .speak(speech)
          .getResponse();
    },

};

const GetNewTickets = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type == 'IntentRequest' &&
          handlerInput.requestEnvelope.request.intent.name == 'GetNewTickets';
  },
  async handle(handlerInput) {
      console.log("GetNewTickets");
      var url = process.env.SERVICEURL;
      var speech = "";
      var res = await ServiceAlerts.GetTickets(url);
      if(res)
        speech += res;
      return await handlerInput.responseBuilder
          .speak(speech)
          .getResponse();
    },

};

const GetBadServicesSMS = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type == 'IntentRequest' &&
          handlerInput.requestEnvelope.request.intent.name == 'GetBadServicesSMS';
  },
  async handle(handlerInput) {
      console.log("GetBadServicesSMS");
      var url = process.env.SERVICEURL;
      var speech = "";
      var res = await ServiceAlerts.GetBadServicesSMS(url);
      if(res)
        speech += res;
      return await handlerInput.responseBuilder
          .speak(speech)
          .getResponse();
    },

};

const HelpHandler = {
  canHandle(handlerInput) {
    console.log(JSON.stringify(handlerInput));
    const request = handlerInput.requestEnvelope.request;
    return  request.type === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'AMAZON.CancelIntent'
        || request.type === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log('Session ended with reason: ${handlerInput.requestEnvelope.request.reason}');

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log('Error handled: ${error.message}' + "//" + error.stack);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetServiceHandler,
    GetStats,
    OpenDashboard,
    DailyStart,
    GetBadServices,
    GetNewTickets,
    GetBadServicesSMS,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();