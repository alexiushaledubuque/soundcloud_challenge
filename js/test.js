
var http = require("https");

var options = {
  "method": "GET",
  "hostname": "api.soundcloud.com",
  "port": null,
  "path": "/tracks?client_id=b8248d692be930536efb3ac01d46199f",
  "headers": {
    "client_id": "b8248d692be930536efb3ac01d46199f",
    "cache-control": "no-cache",
    "postman-token": "56615903-8e7d-5e7d-5089-d437a6219502"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(JSON.stringify(body.toString(), null, 4));
  });
});

req.write("{\n\t\"todo\": \"Study for interviews\"\n}\n");
req.end();
