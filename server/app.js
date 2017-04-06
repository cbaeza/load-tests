var http = require('http');
var _hostname = '';
var _path = '';

module.exports = {
	post: function(data, cb){
		var request = http.request({
			hostname : _hostname,
			path : _path,
			method: 'POST',
			headers: {
			 'Content-Type': 'application/xml',
			 'Accept': 'application/xml'
		  	}
		}, function(response){
			var data = '';
			response.on('data', function(chunk){
				data += chunk;
			});
			response.on('end', function(){
				cb(null, JSON.parse(data));
			});
		}); // req

		request.write(JSON.stringify(data));
		request.end();
	}
};