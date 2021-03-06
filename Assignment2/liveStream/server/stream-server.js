﻿
var STREAM_SECRET = process.argv[2],
	STREAM_PORT = process.argv[3] || 8082,
	WEBSOCKET_PORT = process.argv[4] || 8084,
	STREAM_MAGIC_BYTES = 'jsmp'; // Must be 4 bytes

var width = 320,
	height = 240;

// Websocket Server
var socketServer = new (require('ws').Server)({port: WEBSOCKET_PORT});
socketServer.on('connection', function(socket) {
	
	var streamHeader = new Buffer(8);
	streamHeader.write(STREAM_MAGIC_BYTES);
	streamHeader.writeUInt16BE(width, 4);
	streamHeader.writeUInt16BE(height, 6);
	socket.send(streamHeader, {binary:true});

	console.log( 'New WebSocket Connection ('+socketServer.clients.length+' total)' );
	
	socket.on('close', function(code, message){
		console.log( 'Disconnected WebSocket ('+socketServer.clients.length+' total)' );
	});
});

socketServer.broadcast = function(data, opts) {
	for( var i in this.clients ) {
		if (this.clients[i].readyState == 1) {
			this.clients[i].send(data, opts);
		}
		else {
			console.log( 'Error: Client ('+i+') not connected.' );
		}
	}
};
/*Recieve images from party host*/
var http = require("http");
var connect = require("connect");
var serveStatic=require('serve-static');
var app = connect();
var WebSocketServer = require("ws").Server;
var server;
var wsServer;
var serve=serveStatic('public');
   
    server = http.createServer(serve);
    wsServer = new WebSocketServer({
    server: server
});

wsServer.on("connection", function(ws) {
    console.log("connection established ");
ws.on("message", function(message, flags) {
    //console.log("message received:");
    //ws.send(message, flags);
    socketServer.broadcast(message, {binary:true});
    });
});
server.listen(STREAM_PORT);

console.log('Listening for video from host on http://127.0.0.1:'+STREAM_PORT+'/<secret>/<width>/<height>');
console.log('Awaiting WebSocket connections on ws://127.0.0.1:'+WEBSOCKET_PORT+'/');