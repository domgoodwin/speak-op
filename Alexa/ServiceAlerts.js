const https = require('https');
const fetch = require("node-fetch");
url = "";
async function getBadServices(){
    var requrl = url + "/bad-services";
    try {
        const response = await fetch(requrl);
        const json = await response.json();
        console.log(JSON.stringify(json));
        return await (json.description);
    } catch (error) {
        console.log(error);
        return "Unable to get services";
    }
}
// getBadServices();
module.exports.GetBadServices = getBadServices;

async function getBadServicesSMS(){
    var requrl = url + "/bad-services-sms";
    try {
        const response = await fetch(requrl);
        const json = await response.json();
        console.log(JSON.stringify(json));
        return await (json.description);
    } catch (error) {
        console.log(error);
        return "Unable to get services";
    }
}
// getBadServicesSMS();
module.exports.GetBadServicesSMS = getBadServicesSMS;

async function getTickets(){
    var requrl = url + "/tickets";
    try {
        const response = await fetch(requrl);
        const json = await response.json();
        console.log(JSON.stringify(json));
        return await (json.description);
    } catch (error) {
        console.log(error);
        return "Unable to get tickets";
    }
}
//getTickets();
module.exports.GetTickets = getTickets;