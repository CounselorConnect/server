var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

var chatter = require('./chatter');

server.listen(port, function() {
  console.log('CounselorConnect started at http://localhost:%s.', port);
});

// Public website
app.use(express.static(path.join(__dirname, '../www/public')));

// Chatting sockets
io.on('connection', chatter);

app.use(function(req, res) {
  res.status(404);

  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, '../www/public/404.html'));
  } else if (req.accepts('json')) {
    res.send({ error: 'Page not found.' });
  } else {
    res.type('txt').send('Page not found.');
  }
});
