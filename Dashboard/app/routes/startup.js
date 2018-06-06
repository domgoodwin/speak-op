// routes/note_routes.js
module.exports = function(app, db) {
  app.post('/startup', (req, res) => {
    var spawn = require("child_process").spawn,child;
    child = spawn("powershell.exe",["C:/\\repo/\\speak-op/\\Dashboard/\\Kiosk-Mode/\\Ciklum-Kiosk.ps1"]);
    child.stdout.on("data",function(data){
        console.log("Powershell Data: " + data);
    });
    child.stderr.on("data",function(data){
        console.log("Powershell Errors: " + data);
    });
    child.on("exit",function(){
        console.log("Powershell Script finished");
        res.send('Start-up script successfully ran.');
    });
    child.stdin.end(); //end input
    console.log(req.body)
  });
};
