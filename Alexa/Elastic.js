const https = require('https');
const fetch = require("node-fetch");
url = "https://search-rpa-demo-5ytqt4pq75irmtyirthnq3cw6q.eu-west-2.es.amazonaws.com";
async function getStatusNew(name){
    var requrl = url + "/tc/status/_search?q=name:" + name;
    try {
        const response = await fetch(requrl);
        const json = await response.json();
        console.log(JSON.stringify(json));
        console.log("The service: " + name + ", is currently: " + json.hits.hits[0]._source.status);
        return await ("The service: " + name + ", is currently: " + json.hits.hits[0]._source.status);
    } catch (error) {
        console.log(error);
        return "Unable to find service: ";
    }
}
// getStatusNew("google");
module.exports.GetStatusNew = getStatusNew;

async function getStats(){
    var requrl = url + "/tc-capacity/capacity/1";
    try {
        const response = await fetch(requrl);
        const json = await response.json();
        console.log(JSON.stringify(json));
        return json._source.services;
    } catch (error) {
        console.log(error);
        return "Unable to call";
    }
}
//getStats();
module.exports.GetStats = getStats;

async function openDash(endpoint, dash, screen){
    var requrl = endpoint + "/dash";
    try {
        const response = await fetch(requrl);
        const json = await response.json();
        console.log(JSON.stringify(json));
        return json;
    } catch (error) {
        console.log(error);
        return "Unable to call dashboard endpoint: " + requrl;
    }
}
//getStats();
module.exports.OpenDash = openDash;

// Logs IP used for secuirty purposes
getIP(function(ip){
    console.log(ip);
})
function getIP(callback){
    var url = "https://api.ipify.org?format=json";
    https.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            callback(data)
        });
    })
}
