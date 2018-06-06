const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const shell = require('node-powershell');
app.use(bodyParser.urlencoded({   extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies
var result = "";
var err = "";
var url = "";

function chooseURL(request){
  switch(request) {
    case "gecko":
      url = "https://app.geckoboard.com/edit/dashboards/113650";
      break;
    case "pulse":
      url = "https://apppulse-active.saas.hpe.com/apmsaas-web/dist/index.html?TENANTID=335121943#/dashboard";
      break;
    case "kibana":
      url = "search-rpa-demo-5ytqt4pq75irmtyirthnq3cw6q.eu-west-2.es.amazonaws.com/_plugin/kibana/app/kibana#/dashboard/59bca6e0-67d9-11e8-8e7d-93c83d19852b";
      break;
    case "social":
      url = "C:/repo/speak-op/Dashboard/SocialMedia/CSOMediaDashboard.html";
      break;
  }
return url;
}

module.exports = function(app, db) {
  app.post('/newdash', function(req, res) {
    var url = chooseURL(req.query.url);
    var mon = req.query.mon;
    var spawn = require("child_process").spawn,child;
    let ps = new shell({
      executionPolicy: 'Bypass',
      noProfile: true
    });

    ps.addCommand('C:\\repo\\speak-op\\Dashboard\\Kiosk-Mode\\newdash.ps1', [{name: 'url', value: url},{name: 'mon', value:mon}])
    ps.invoke()
    .then(output => {
      console.log(output);
    })
    .catch(err => {
      console.log(err);
      ps.dispose();
    });

    res.send('New dashboard script triggered.');
})};
