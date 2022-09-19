// this will deploy the entire dir 
const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('./mime');

console.log("Starting server");
var src = process.argv[2] || "/static";

http.createServer((req, res) => {
  var url = (req.url == "/")? "index.html": req.url;
  var pat = path.join(process.cwd(),src,url);
  var encoding = null;
  if(pat.includes(".png") || pat.includes(".jpg"))
    encoding = "binary";
  mime.sendPipe(res, pat);
}).listen(3000);
