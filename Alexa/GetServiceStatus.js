const https = require('https');
exports.GetStatus = function(name, callback){
    url = "https://search-rpa-demo-5ytqt4pq75irmtyirthnq3cw6q.eu-west-2.es.amazonaws.com";
    path = "/tc/status/_search?q=name:" + name;
      
    https.get(url+path, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            jsonData = JSON.parse(data).hits
            callback(jsonData.hits[0]._source.status);
            // if(jsonData.hits.length > 1){
            //     return "Too many matches";
            // } else {
            //     return jsonData.hits[0];
            // }
            
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}
this.GetStatus("google", function(status){
    console.log(status);
});