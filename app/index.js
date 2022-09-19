// this will deploy the entire dir 
const express = require('express');
const path = require('path');
const api = require('./api/index');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'))
app.use("/api/*", api);
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
})

app.listen(port, function() {
  console.log('I am listening!');
});