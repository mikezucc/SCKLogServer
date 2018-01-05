window.onload = function() {
  var socket = io('http://127.0.0.1:3003');
  socket.on('log-event', function (data) {
    console.log(data);
    document.write(data["log"]);
  });
  socket.on("start", function(data) {
    console.log("new session");
    document.write("<hr>")
  });
};
