// this will deploy the entire dir 
const express = require('express');
const path = require('path');
const api = require('./api/index');
const fs = require('fs');
const app = express();
const mysql = require('serverless-mysql')({
  config: {
    host: process.env.ENDPOINT,
    database: process.env.DATABASE,
    user: process.env.USERNAME,
    password: process.env.PASSWORD
  }
})
const port = process.env.PORT || 3000;

app.use(express.static('public'))
app.use("/api/*", api);
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
})

app.post('/form', (req, res) => {
  var body = req.body.replace("<","&lt;").replace(">","&rt;").replace(",", "_");
  res.json({ok: true});
})

app.get('*', (req, res) => {
  var p = fs.readFileSync("./public/error.html").toString();
  res.writeHead(200, {'Content-Type':'text/html'});
  res.write(p);
  return p;
})

app.listen(port, function() {
  console.log('I am listening!');
});