const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const shell = require('node-powershell');
app.use(bodyParser.urlencoded({   extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies
// routes/note_routes.js
module.exports = function(app, db) {
  app.post('/startup', function(req, res) {
    var spawn = require("child_process").spawn,child;
    let ps = new shell({
      executionPolicy: 'Bypass',
      noProfile: true
    });
    ps.addCommand('C:/\\repo/\\speak-op/\\Dashboard/\\Kiosk-Mode/\\Ciklum-Kiosk.ps1')
    ps.invoke()
    .then(output => {
      console.log(output);
    })
    .catch(err => {
      console.log(err);
      ps.dispose();
    });
    res.send('Start-up script triggered.');
  });
};
