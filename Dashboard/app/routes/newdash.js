const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const shell = require('node-powershell');
app.use(bodyParser.urlencoded({   extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

module.exports = function(app, db) {
  app.post('/newdash', function(req, res) {
    var url = req.query.url;
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
      res.send('New dashboard script successfully ran.');
    })
    .catch(err => {
      console.log(err);
      ps.dispose();
      res.send('New dashboard script ran with errors: ' + err);
    });
})};
