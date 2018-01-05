//      ___           ___           ___                         ___           ___
//     /  /\         /  /\         /__/|                       /  /\         /  /\
//    /  /:/_       /  /:/        |  |:|                      /  /::\       /  /:/_
//   /  /:/ /\     /  /:/         |  |:|      ___     ___    /  /:/\:\     /  /:/ /\
//  /  /:/ /::\   /  /:/  ___   __|  |:|     /__/\   /  /\  /  /:/  \:\   /  /:/_/::\
// /__/:/ /:/\:\ /__/:/  /  /\ /__/\_|:|____ \  \:\ /  /:/ /__/:/ \__\:\ /__/:/__\/\:\
// \  \:\/:/~/:/ \  \:\ /  /:/ \  \:\/:::::/  \  \:\  /:/  \  \:\ /  /:/ \  \:\ /~~/:/
//  \  \::/ /:/   \  \:\  /:/   \  \::/~~~~    \  \:\/:/    \  \:\  /:/   \  \:\  /:/
//   \__\/ /:/     \  \:\/:/     \  \:\         \  \::/      \  \:\/:/     \  \:\/:/
//     /__/:/       \  \::/       \  \:\         \__\/        \  \::/       \  \::/
//     \__\/         \__\/         \__\/                       \__\/         \__\/



var ecstatic = require('ecstatic');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(ecstatic({
  root: __dirname,
  handleError : false
}));
app.use(function(req,res,next) {
  // res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Allow-Methods","POST,GET")
  // res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
  next()
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var watchPage;
fs.readFile('./watch.html', function (err, html) {
    if (err) {
        throw err;
    }
    watchPage = html;
  });

var logger;
function record(string) {
  var withDate = printDate() + string;
  if (activeSocket) { activeSocket.emit('log-event',{"log":withDate}); }
  if (logger)       { logger.write(withDate); }
}
function startNewLogger(sessionStamp) {
  if (logger) {
    logger.end()
  }
  if (activeSocket) {
    activeSocket.emit("start");
  }
  logger = fs.createWriteStream(("./" + sessionStamp + '-log.txt'), {
    flags: 'a' // 'a' means appending (old data will be preserved)
  });
  record("--SESSION BEGIN--");
}
app.post('/start', function(req, res) {
  var sessionStamp = req.body.session;
  startNewLogger(sessionStamp);
  res.writeHeader(200, {"Content-Type": "text/html"});
  res.end()
});
app.post('/log', function(req, res) {
  var payloadString = req.body.payload;
  payloadString = payloadString + "\n<br/>";
  record(payloadString);
  res.writeHeader(200, {"Content-Type": "text/html"});
  res.end()
});
app.get('/watch', function(req, res) {
  res.writeHeader(200, {"Content-Type": "text/html"});
  res.write(watchPage);
  res.end()
});

// this should have the security file options as param 1 in createServer
var server = require('http').createServer(app)
// var serverHttps = require('https').createServer(sslOptions, app);

// var p2pserver = require('http').Server
var io = require('socket.io')(server);

server.listen('3003', function () {
  console.log('SCKLog listening on all:3003')
})

function printDate() {
  var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
  return date + ' || ';
}

var activeSocket;
io.on('connection', function (socket) {

  if (activeSocket) {
    activeSocket.disconnect(true);
  }

  activeSocket = socket;

  socket.on('disconnect', function (data) {
    console.log('DISCONNECT');
  });

  socket.on('error', function(error) {
    console.log(error);
  });

  socket.on('connect_error', function(error) {
    console.log(error);
  });
})
