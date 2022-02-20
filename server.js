const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(__dirname+'/dist/games-app'));

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname,'/dist/games-app/index.html'));
});

// app.get('/*', (req, res) => res.send(__dirname+'/dist/games-app/index.html'));

app.listen(process.env.PORT || 8080);

