var express = require('express'),
    http = require('http'),
    app = express(),
    theServer = http.createServer(app),
    port = process.env.PORT || 8080    
    ;



app.use(express.bodyParser());
app.post("/data", function(req, res) { });

app.use(express.static(__dirname + "/src"));
theServer.listen(port, function () {
    console.log("Listening on " + port);
});
